import React, { Component } from 'react';
import PropTypes from 'prop-types';

import QRReader from 'react-qr-reader';

export default class QrReader extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
    onError: PropTypes.func,
  };
  static defaultProps = {
    onError: () => ({}),
  }
  render() {
    return (
      <div className="qr-video-container">
        <QRReader
          delay={500}
          facingMode="rear"
          onScan={this.props.onScan}
          onError={this.props.onError}
        />
      </div>
    );
  }
}
