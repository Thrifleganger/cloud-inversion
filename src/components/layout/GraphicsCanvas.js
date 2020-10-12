import React, {useEffect, useRef} from 'react';
import styles from '../../styles/ProcessingSketch.module.css'

const GraphicsCanvas = (props) => {

  const canvasRef = useRef(null);

  useEffect(
    () => props.graphicsContext.initialize(canvasRef.current),
    [props.graphicsContext]);

  return (
    <>
      {console.log("Rending graphics canvas")}
      <div className={styles.sketch} ref={canvasRef}/>
    </>
  )

}

export default GraphicsCanvas;