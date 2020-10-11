import React from 'react';
import SwipeableViews from "react-swipeable-views";
import Controller from "../controller/Controller";
import {sliderModels} from "../util/InitializationConstants";
import PropTypes from "prop-types";
import styles from "../../styles/layout/Drawer.module.css"


const ControllerALayout = (props) => {
  const globalController = {
    snackbarCallback: props.snackbarCallback,
    sliders: [{
      sliderModel: sliderModels.get("volume-slider"),
      sliderCallback: (value) => props.audioContext.setVolume(value)
    }, {
      sliderModel: sliderModels.get("pan-slider"),
      sliderCallback: (value) => props.audioContext.setPan(value)
    }, {
      sliderModel: sliderModels.get("variance-slider"),
      sliderCallback: (value) => props.audioContext.setVariance(value)
    }]
  }
  const envelopeController = {
    snackbarCallback: props.snackbarCallback,
    sliders: [{
      sliderModel: sliderModels.get("attack-slider"),
      sliderCallback: (value) => props.audioContext.setAttack(value)
    }, {
      sliderModel: sliderModels.get("decay-slider"),
      sliderCallback: (value) => props.audioContext.setDecay(value)
    }, {
      sliderModel: sliderModels.get("sustain-slider"),
      sliderCallback: (value) => props.audioContext.setSustain(value)
    }, {
      sliderModel: sliderModels.get("release-slider"),
      sliderCallback: (value) => props.audioContext.setRelease(value)
    }]
  }
  return (
    <SwipeableViews className={styles.sliderContainer} enableMouseEvents resistance>
      <Controller {...globalController}/>
      <Controller {...envelopeController}/>
    </SwipeableViews>
  );
}

ControllerALayout.propTypes = {
  audioContext: PropTypes.object.isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default React.memo(ControllerALayout);