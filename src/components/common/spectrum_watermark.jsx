import React, { PropTypes, Component } from 'react';

const buildTime = window.spectrumBuildTime && new Date(window.spectrumBuildTime).toLocaleString();

export default class SpectrumWatermark extends Component {
  static propTypes = {

  }
  render() {
    return (
      <span>
        Powered by Spectrum
        <br />
        Built {buildTime}
      </span>
    );
  }
}
