import React, {useCallback, useState} from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import PropTypes from 'prop-types';
import ControllerDrawer from "./ControllerDrawer";
import styles from "../../styles/layout/MainLayout.module.css"
import SplashScreen from "./SplashScreen";
import NoteInfo from "./NoteInfo";

const MainLayout = (props) => {

  const [isSliderControllerOpen, setSliderControllerOpen] = useState(false);
  const [isBottomDrawerOpen, setBottomDrawerOpen] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isAppLoaded, setAppLoaded] = useState(false);
  const [shouldDisplayInfo, setDisplayInfo] = useState(false);

  const startAudioContext = useCallback(() => {
    props.audioContext.start()
    setAppLoaded(true);
  }, []);

  const toggleSliderDrawer = useCallback((isOpen) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setSliderControllerOpen(isOpen);
    }, []
  );

  const toggleBottomDrawer = useCallback((isOpen) => (event) => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setBottomDrawerOpen(isOpen);
    }, []
  );

  const snackbarCallback = useCallback(
    (message) => {
      setSnackbarOpen(true);
      setSnackbarMessage(message);
    }, []
  );

  const toggleNoteInfoCallback = useCallback((value) => setDisplayInfo(value), []);

  return (
    <>
      <ControllerDrawer toggleSliderDrawer={toggleSliderDrawer}
                        isSliderControllerOpen={isSliderControllerOpen}
                        isBottomDrawerOpen={isBottomDrawerOpen}
                        toggleBottomDrawer={toggleBottomDrawer}
                        audioContext={props.audioContext}
                        graphicsContext={props.graphicsContext}
                        snackbarCallback={snackbarCallback}
                        toggleNoteInfoCallback={toggleNoteInfoCallback}/>
      <Snackbar className={styles.snackbarLayout}
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}/>
      {shouldDisplayInfo ? (<NoteInfo/>) : ""}
      {isAppLoaded ? "" : (<SplashScreen startAudioContext={startAudioContext}/>)}
    </>
  );
}

MainLayout.propTypes = {
  audioContext: PropTypes.object.isRequired,
  graphicsContext: PropTypes.object.isRequired
}

export default MainLayout;