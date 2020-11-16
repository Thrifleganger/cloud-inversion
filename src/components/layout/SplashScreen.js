import React from "react";
import styles from "../../styles/layout/MainLayout.module.css"
import HeadsetIcon from '@material-ui/icons/Headset';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';

const SplashScreen = (props) => {

  return (
    <div className={styles.splashScreen} onClick={props.startAudioContext}>
      <div className={styles.splashScreenIconGrid}>
        <div className={styles.splashScreenIconGridFlexbox}>
          <div className={styles.splashScreenIconsHorizontal}>
            <HeadsetIcon htmlColor={"#6c739d"} fontSize={"large"}/>
            <VolumeUpIcon htmlColor={"#786c9d"} fontSize={"large"}/>
          </div>
          <div className={styles.splashScreenIconsHorizontal}>
            <MusicNoteIcon htmlColor={"#9d6c80"} fontSize={"large"}/>
            <GraphicEqIcon htmlColor={"#986c9d"} fontSize={"large"}/>
          </div>
        </div>
      </div>
      <div className={styles.splashScreenTitle}>
        {'{swara\'s}'}
      </div>
      <div className={styles.splashScreenTitle2}>
        dreamscape
      </div>
    </div>
  );
}

export default SplashScreen