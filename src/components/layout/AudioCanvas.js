import React, {Component} from 'react';
import Arpeggiator from "../audio/Arpeggiator";

class AudioCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {width: 0, height: 0};
    this.isTouchActivated = false;
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    this.props.audioContext.initialize(new Arpeggiator());
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({width: window.innerWidth, height: window.innerHeight});
  }

  render() {
    const style = {
      position: "absolute",
      left: 0,
      top: 0,
      height: this.state.height,
      width: this.state.width
    }
    return (
      <div style={style}
           onMouseDown={event => this.handleGenericPressEvent([{x: event.clientX, y: event.clientY}]) }
           onMouseUp={() => this.handleGenericReleasedEvent([])}
           onTouchStart={(event) => {
             if (this.isTouchActivated) {
               return;
             }
             if (event.targetTouches.length === 0) {
               return;
             }
             this.isTouchActivated = true;
             this.handleGenericPressEvent([{
               x: event.targetTouches.item(0).clientX,
               y: event.targetTouches.item(0).clientY
             }]);
             /*const coordinates = Array(event.touches.length).fill()
               .flatMap((_,i) => [{x: event.touches.item(i).clientX, y: event.touches.item(i).clientY}])
             this.handleGenericPressEvent(coordinates);*/
           }}
           onTouchEnd={(event) => {

             if (event.targetTouches.length !== 0) {
               return;
             }
             this.isTouchActivated = false;
             this.handleGenericReleasedEvent(event);
           }}/>
    );
  }

  handleGenericPressEvent = (coordinates) => {
    this.props.audioContext.handleGenericTriggerEvent(coordinates)
  }

  handleGenericReleasedEvent = (coordinates) => {
    this.props.audioContext.handleGenericReleaseEvent(coordinates);
  }
}

export default AudioCanvas;
