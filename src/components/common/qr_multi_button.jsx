import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import QrReader from './qr_reader';

export default class QRMultiButton extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
    header: PropTypes.string,
    validateScan: PropTypes.func,
  };
  static defaultProps = {
    header: 'Scan QR Codes',
    validateScan: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { message: null, color: null, scannedItems: {} };
    this.handleScan = this.handleScan.bind(this);
  }
  setMessage(color, message) {
    clearTimeout(this.timeout);
    this.setState({ color, message });
    this.timeout = setTimeout(() => {
      this.setState({ color: null, message: null });
    }, 2000);
  }
  handleScan(data) {
    if (this.state.message) { return null; } // wait till the message updates
    const { validateScan } = this.props;
    const { scannedItems } = this.state;
    return new Promise((resolve) => {
      if (validateScan) {
        resolve(validateScan(data));
      } else {
        resolve(data);
      }
    }).then((res) => {
      if (scannedItems[data]) {
        this.setMessage('warning', 'Scanned, but already received this data');
      } else {
        this.setState({ scannedItems: { ...scannedItems, [data]: true } });
        this.setMessage('positive', 'Scanned Item!');
        this.props.onScan(res);
      }
    }).catch((err) => {
      this.setMessage('negative', err.message);
    });
  }
  render() {
    return (
      <EZModal
        size="small"
        content={
          <div>
            <Message
              icon="qrcode"
              positive={this.state.color === 'positive'}
              negative={this.state.color === 'negative'}
              warning={this.state.color === 'warning'}
              header={this.state.message || this.props.header}
              content={`Scanned ${Object.keys(this.state.scannedItems).length} items`}
            />
            <QrReader onScan={this.handleScan} />
          </div>
        }
        trigger={
          <Button
            content="Scan QRs"
            basic
            icon="qrcode"
            onClick={(e) => {
              e.preventDefault();
              this.setState({ scannedItems: {} });
            }}
          />
        }
      />
    );
  }
}
