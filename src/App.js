import React, {Component} from 'react';
import GradientBackground from "./components/layout/GradientBackground";
import './styles/layout/GradientBackground.module.css'
import GraphicsCanvas from "./components/layout/GraphicsCanvas";
import MainLayout from "./components/layout/MainLayout";
import AudioContext from "./components/audio/AudioContext";
import AudioCanvas from "./components/layout/AudioCanvas";
import GraphicsContext from "./components/graphics/GraphicsContext";

class App extends Component {

  constructor() {
    super();
    this.audioContext = new AudioContext();
    this.graphicsContext = new GraphicsContext();
    this.graphicsContext.setAudioContext(this.audioContext);

  }
  render() {
    return (
      <>
        <AudioCanvas audioContext={this.audioContext}/>
        <GraphicsCanvas graphicsContext={this.graphicsContext}/>
        <GradientBackground/>
        <MainLayout audioContext={this.audioContext} graphicsContext={this.graphicsContext}/>
      </>
    )
  }
}

export default App;
