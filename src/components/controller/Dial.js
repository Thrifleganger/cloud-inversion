import React, {Component} from 'react';
import PrecisionInputs from 'precision-inputs/common/precision-inputs.fl-controls';
import "precision-inputs/css/precision-inputs.fl-controls.css";
import PropTypes from "prop-types";

class Dial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dial: null
    }
    this.dialRef = React.createRef();
  }

  componentDidMount() {
    const {minValue, maxValue, defaultValue, step, parameter} = this.props.model
    this.setState({
      dial: new PrecisionInputs.FLStandardKnob(this.dialRef.current, {
        min: minValue,
        max: maxValue,
        initial: defaultValue,
        step: step,
        color: "#29DFF9"
      })
    }, () => {
      this.state.dial.addEventListener('change', (event) => {
        this.props.changeCallback(event);
        this.props.snackbarCallback(`${parameter} : ${event.target.value}`);
      });
    });
  }

  render() {
    console.log(`Rendering dial ${this.props.model.parameter}`)
    return (
      <div ref={this.dialRef} className="my-knob-container"/>
    );
  }
}

Dial.propTypes = {
  model: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    defaultValue: PropTypes.number.isRequired,
    step: PropTypes.number.isRequired
  }),
  changeCallback: PropTypes.func.isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default Dial;