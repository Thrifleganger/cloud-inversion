import React, {Component} from 'react';
import styles from '../../styles/layout/GradientBackground.module.css';

class GradientBackground extends Component {
  render() {
    console.log("Rendering gradient")
    return (
      <div className={styles.gradientBackground}/>
    );
  }
}

export default GradientBackground;