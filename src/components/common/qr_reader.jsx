import React, { PropTypes, Component } from 'react';

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
          facingMode="rear" // prefer rear camera (mobile - TODO fix?)
          onScan={this.props.onScan}
          onError={this.props.onError}
        />
      </div>
    );
  }
}
