import React from 'react';
import {Container, Divider, SwipeableDrawer} from "@material-ui/core";
import ControllerALayout from "./ControllerALayout";
import ControllerBLayout from "./ControllerBLayout";
import styles from "../../styles/layout/Drawer.module.css"
import BottomDrawer from "./BottomDrawer";
import PropTypes from 'prop-types';

const ControllerDrawer = (props) => {

  const textDeclaration = (
    <>
      Copyleft 2020 &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp;   &lt;/&gt; with &lt;3 by <a
      href="https://github.com/Thrifleganger/cloud-inversion">Akash Murthy</a>
    </>
  )
  return (
    <>
      <SwipeableDrawer onClose={props.toggleSliderDrawer(false)} onOpen={props.toggleSliderDrawer(true)}
                       open={props.isSliderControllerOpen} swipeAreaWidth={150} anchor={"top"} keepMounted={true}>
        <div className={styles.sliderDrawer}>
          <Container maxWidth="sm">
            {console.log("Rendering slider drawer")}
            <ControllerALayout audioContext={props.audioContext} snackbarCallback={props.snackbarCallback}/>
            <Divider variant={"middle"}/>
            <ControllerBLayout audioContext={props.audioContext} snackbarCallback={props.snackbarCallback}/>
          </Container>
        </div>
        <div className={styles.drawerHandleTop}/>
      </SwipeableDrawer>
      <SwipeableDrawer onClose={props.toggleBottomDrawer(false)} onOpen={props.toggleBottomDrawer(true)}
                       open={props.isBottomDrawerOpen} swipeAreaWidth={50} anchor={"bottom"} keepMounted={true}>
        <div className={styles.bottomDrawer}>
          <div className={styles.drawerHandleBottom}/>
          <Container maxWidth="sm">
            <BottomDrawer audioContext={props.audioContext}
                          graphicsContext={props.graphicsContext}
                          toggleNoteInfoCallback={props.toggleNoteInfoCallback}/>
          </Container>
          <div className={styles.textDeclaration}>
            {textDeclaration}
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
}

ControllerDrawer.propTypes = {
  toggleSliderDrawer: PropTypes.func.isRequired,
  isSliderControllerOpen: PropTypes.bool.isRequired,
  isBottomDrawerOpen: PropTypes.bool.isRequired,
  toggleBottomDrawer: PropTypes.func.isRequired,
  audioContext: PropTypes.object.isRequired,
  graphicsContext: PropTypes.object.isRequired,
  snackbarCallback: PropTypes.func.isRequired,
  toggleNoteInfoCallback: PropTypes.func.isRequired
}

export default React.memo(ControllerDrawer);