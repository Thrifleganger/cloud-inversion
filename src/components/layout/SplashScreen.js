import React from "react";
import styles from "../../styles/layout/MainLayout.module.css"
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';

const SplashScreen = (props) => {

  return (
    <div className={styles.splashScreen}>
      <div className={styles.splashScreenButton}>
        <PlayCircleOutlineIcon
          htmlColor={"#4b3092"} fontSize={"large"} onClick={props.startAudioContext} />
      </div>
    </div>
  );
}

export default SplashScreen