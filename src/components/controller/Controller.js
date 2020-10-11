import React from 'react';
import Dial from "./Dial";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import styles from "../../styles/layout/Drawer.module.css"

const Controller = (props) => {
  const style = {
    width: "100%",
    overflow: "hidden",
  }
  const {snackbarCallback, sliders} = props
  return (
    <div style={style}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {sliders.map(slider => (
          <Grid key={slider.sliderModel.id} item xs={3}>
            <Dial model={slider.sliderModel}
                  changeCallback={event => slider.sliderCallback(event.target.value)}
                  snackbarCallback={snackbarCallback}/>
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center" alignItems="center" spacing={2}>
        {sliders.map(slider => (
          <Grid className={styles.sliderLabel} key={slider.sliderModel.id} item xs={3}>
            {slider.sliderModel.parameter}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Controller.propTypes = {
  sliders: PropTypes.arrayOf(
    PropTypes.shape({
      sliderModel: PropTypes.object.isRequired,
      sliderCallback: PropTypes.func.isRequired
    })
  ).isRequired,
  snackbarCallback: PropTypes.func.isRequired
}

export default React.memo(Controller);