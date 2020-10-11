import React from 'react';
import SwipeableViews from "react-swipeable-views";
import {sliderModels} from "../util/InitializationConstants";
import Controller from "../controller/Controller";
import PropTypes from "prop-types";
import styles from "../../styles/layout/Drawer.module.css"
import PianoLayout from "./PianoLayout";
import {keys} from "@material-ui/core/styles/createBreakpoints";

const ControllerBLayout = (props) => {
  const arpeggiatorController = {
    snackbarCallback: props.snackbarCallback,
    sliders: [{
      sliderModel: sliderModels.get("arpeggiator-speed-slider"),
      sliderCallback: (value) => props.audioContext.setArpeggiatorSpeed(value)
    }, {
      sliderModel: sliderModels.get("arpeggiator-octave-slider"),
      sliderCallback: (value) => props.audioContext.setArpeggiatorOctaves(value)
    }]
  }
  const auxEffectsController = {
    snackbarCallback: props.snackbarCallback,
    sliders: [{
      sliderModel: sliderModels.get("delay-time-slider"),
      sliderCallback: (value) => props.audioContext.setDelayTime(value)
    }, {
      sliderModel: sliderModels.get("delay-feedback-slider"),
      sliderCallback: (value) => props.audioContext.setDelayFeedback(value)
    }, {
      sliderModel: sliderModels.get("delay-mix-slider"),
      sliderCallback: (value) => props.audioContext.setDelayMix(value)
    }, {
      sliderModel: sliderModels.get("reverb-mix-slider"),
      sliderCallback: (value) => props.audioContext.setReverbMix(value)
    }]
  }
  return (
    <SwipeableViews className={styles.sliderContainer} enableMouseEvents resistance animateHeight>
      <Controller {...arpeggiatorController} />
      <PianoLayout keySelectionCallback={(keysArray) => props.audioContext.setArpeggiatorSemitones(keysArray)}/>
      <Controller {...auxEffectsController} />
    </SwipeableViews>
  );
}

ControllerBLayout.propTypes = {
  audioContext: PropTypes.object.isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default React.memo(ControllerBLayout);