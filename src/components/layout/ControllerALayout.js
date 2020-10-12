import React, {useCallback, useMemo, useState} from 'react';
import SwipeableViews from "react-swipeable-views";
import Controller from "../controller/Controller";
import {sliderModels} from "../util/InitializationConstants";
import PropTypes from "prop-types";
import styles from "../../styles/layout/Drawer.module.css"
import Dots from "material-ui-dots";


const ControllerALayout = (props) => {
  const globalController = useMemo(() => {
    return {
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
  }, [props.snackbarCallback, props.audioContext]);
  const envelopeController = useMemo(() => {
    return {
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
  }, [props.snackbarCallback, props.audioContext]);

  console.log("Rendering Controller A")

  const [index, setIndex] = useState(0);
  const indexChangeCallback = useCallback((value) => setIndex(value), []);

  return (
    <>
      <div className={styles.relativeBox}>
        <SwipeableViews className={styles.sliderContainer}
                        enableMouseEvents
                        resistance
                        onChangeIndex={indexChangeCallback}>
          <Controller {...globalController}/>
          <Controller {...envelopeController}/>
        </SwipeableViews>
        <Dots className={styles.sliderPagination} count={2} index={index}/>
      </div>
    </>
  );
}

ControllerALayout.propTypes = {
  audioContext: PropTypes.object.isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default React.memo(ControllerALayout);