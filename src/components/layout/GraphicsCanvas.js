import React, {Component, useEffect, useRef} from 'react';
import p5 from 'p5';
import PrimeMover from "../graphics/PrimeMover";
import styles from '../../styles/ProcessingSketch.module.css'
import {v4 as uuid} from 'uuid'
import SecondaryMoverSystem from "../graphics/SecondaryMoverSystem";

const GraphicsCanvas = (props) => {

  const canvasRef = useRef(null);

  useEffect(() => props.graphicsContext.initialize(canvasRef.current), []);

  return (
    <>
      {console.log("Rending graphics canvas")}
      <div className={styles.sketch} ref={canvasRef}/>
    </>
  )

}

export default GraphicsCanvas;