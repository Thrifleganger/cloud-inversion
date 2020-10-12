import React from 'react';
import {Container, Divider, Drawer, SwipeableDrawer} from "@material-ui/core";
import ControllerALayout from "./ControllerALayout";
import ControllerBLayout from "./ControllerBLayout";
import styles from "../../styles/layout/Drawer.module.css"
import BottomDrawer from "./BottomDrawer";
import PropTypes from 'prop-types';
import {BrowserView, MobileView} from 'react-device-detect';

const ControllerDrawer = (props) => {

  const textDeclaration = (
    <>
      Copyleft 2020 &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp;   &lt;/&gt; with &lt;3 by <a
      href="https://github.com/Thrifleganger/swara-react-synth" target="_blank">Akash Murthy</a>
    </>
  )

  const topControllerSection = (
    <>
      <div className={styles.sliderDrawer}>
        <Container maxWidth="sm">
          <ControllerALayout audioContext={props.audioContext} snackbarCallback={props.snackbarCallback}/>
          <Divider variant={"middle"}/>
          <ControllerBLayout audioContext={props.audioContext} snackbarCallback={props.snackbarCallback}/>
        </Container>
      </div>
      <div className={styles.drawerHandleTop}/>
    </>
  )

  const bottomControllerSection = (
    <>
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
    </>
  )
  return (
    <>
      <MobileView>
        <SwipeableDrawer onClose={props.toggleSliderDrawer(false)} onOpen={props.toggleSliderDrawer(true)}
                         open={props.isSliderControllerOpen} swipeAreaWidth={150} anchor={"top"} keepMounted={true}>
          {topControllerSection}
        </SwipeableDrawer>
        <SwipeableDrawer onClose={props.toggleBottomDrawer(false)} onOpen={props.toggleBottomDrawer(true)}
                         open={props.isBottomDrawerOpen} swipeAreaWidth={50} anchor={"bottom"} keepMounted={true}>
          {bottomControllerSection}
        </SwipeableDrawer>
      </MobileView>
      <BrowserView>
        <Drawer onClose={props.toggleSliderDrawer(false)}
                open={props.isSliderControllerOpen} anchor={"top"} keepMounted={true}>
          {topControllerSection}
        </Drawer>
        <Drawer onClose={props.toggleBottomDrawer(false)}
                open={props.isBottomDrawerOpen} anchor={"bottom"} keepMounted={true}>
          {bottomControllerSection}
        </Drawer>
      </BrowserView>

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