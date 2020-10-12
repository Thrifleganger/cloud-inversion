import React, {useCallback, useMemo, useState} from 'react';
import SwipeableViews from "react-swipeable-views";
import {sliderModels} from "../util/InitializationConstants";
import Controller from "../controller/Controller";
import PropTypes from "prop-types";
import styles from "../../styles/layout/Drawer.module.css"
import PianoLayout from "./PianoLayout";
import Dots from "material-ui-dots";

const ControllerBLayout = (props) => {
  const arpeggiatorController = useMemo(() => {
    return {
      snackbarCallback: props.snackbarCallback,
      sliders: [{
        sliderModel: sliderModels.get("arpeggiator-speed-slider"),
        sliderCallback: (value) => props.audioContext.setArpeggiatorSpeed(value)
      }, {
        sliderModel: sliderModels.get("arpeggiator-octave-slider"),
        sliderCallback: (value) => props.audioContext.setArpeggiatorOctaves(value)
      }]
    }
  }, [props.snackbarCallback, props.audioContext]);
  const auxEffectsController = useMemo(() => {
    return {
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
  }, [props.snackbarCallback, props.audioContext]);

  console.log("Rendering Controller B")

  const [index, setIndex] = useState(0);
  const indexChangeCallback = useCallback((value) => setIndex(value), []);
  const pianoKeySelectCallback = useCallback(
    (keysArray) => props.audioContext.setArpeggiatorSemitones(keysArray),
    [props.audioContext]);

  return (
    <>
      <div className={styles.relativeBox}>
        <SwipeableViews className={styles.sliderContainer}
                        enableMouseEvents
                        resistance
                        animateHeight
                        onChangeIndex={indexChangeCallback}>
          <Controller {...arpeggiatorController} />
          <PianoLayout keySelectionCallback={pianoKeySelectCallback}/>
          <Controller {...auxEffectsController} />
        </SwipeableViews>
        <Dots className={styles.sliderPagination} count={3} index={index}/>
      </div>
    </>
  );
}

ControllerBLayout.propTypes = {
  audioContext: PropTypes.object.isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default React.memo(ControllerBLayout);