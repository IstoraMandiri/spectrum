import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
