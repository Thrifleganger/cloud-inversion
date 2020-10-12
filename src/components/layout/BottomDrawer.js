import React from 'react';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "../../styles/layout/Drawer.module.css"
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import {Divider} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from 'prop-types';
import {initializationConstants} from "../util/InitializationConstants";

const BottomDrawer = (props) => {

  const horizontalSliderTheme = createMuiTheme({
    overrides: {
      MuiSlider: {
        thumb: {
          color: "#29DFF9",
        },
        track: {
          color: '#baf0fc'
        },
        rail: {
          color: '#16191a'
        }
      }
    }
  });

  console.log("Rendering bottom drawer")

  return (
    <>
      <div className={styles.bottomDrawerSwitches}>
        <FormControl>
          <FormGroup>
            <FormControlLabel
              value="displayAnimation"
              control={
                <Switch color="primary" defaultChecked={initializationConstants.displayAnimation}
                        onChange={(event) => props.graphicsContext.setDisplayAnimation(event.target.checked)}/>
              }
              label="Display animation"
              labelPlacement="end"/>
            <FormControlLabel
              value="displayWaveform"
              control={
                <Switch color="primary" defaultChecked={initializationConstants.displaySpectrum}
                        onChange={(event) => {
                          props.audioContext.setDisplaySpectrum(event.target.checked);
                          props.graphicsContext.setDisplaySpectrum(event.target.checked);
                        }}/>
              }
              label="Display waveform"
              labelPlacement="end"/>
            <FormControlLabel
              value="displayNotes"
              control={
                <Switch color="primary" defaultChecked={initializationConstants.displayNotes}
                        onChange={(event) => props.toggleNoteInfoCallback(event.target.checked)}/>
              }
              label="Display Notes"
              labelPlacement="end"/>
          </FormGroup>
        </FormControl>
      </div>

      <Divider variant={"middle"}/>

      <div className={styles.bottomDrawerSliderSection}>
        <div className={styles.bottomDrawerSliderAndLabelGroup}>
          <Typography id="current-octave-slider" gutterBottom>
            Current octave
          </Typography>
          <ThemeProvider theme={horizontalSliderTheme}>
            <Slider
              defaultValue={initializationConstants.startingOctave}
              aria-labelledby="current-octave-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={7}
              onChangeCommitted={(_, value) => props.audioContext.setCurrentOctave(value)}/>
          </ThemeProvider>
        </div>

        <div className={styles.bottomDrawerSliderAndLabelGroup}>
          <Typography id="animation-speed-slider" gutterBottom>
            Animation speed
          </Typography>
          <ThemeProvider theme={horizontalSliderTheme}>
            <Slider
              defaultValue={initializationConstants.animationSpeed}
              aria-labelledby="animation-speed-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
              onChangeCommitted={(_, value) => props.graphicsContext.setAnimationSpeed(value)}/>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

BottomDrawer.propTypes = {
  audioContext: PropTypes.object.isRequired,
  graphicsContext: PropTypes.object.isRequired,
  toggleNoteInfoCallback: PropTypes.func.isRequired
}

export default React.memo(BottomDrawer);