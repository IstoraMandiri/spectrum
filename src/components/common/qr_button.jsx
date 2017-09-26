import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import { isAddress, toChecksumAddress } from '~/helpers/stringUtils';

import QrReader from './qr_reader';


export default class QrButton extends Component {
  static propTypes = {
    onScan: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  handleScan({ data, hide }) {
    // TODO different types
    if (isAddress(data)) {
      this.props.onScan(toChecksumAddress(data));
      hide();
    } else {
      clearTimeout(this.timeout);
      this.setState({ error: true });
      this.timeout = setTimeout(() => { this.setState({ error: false }); }, 2000);
    }
  }
  render() {
    // return null;
    return (
      <EZModal
        size="small"
        trigger={<Button tabIndex="-1" basic icon="qrcode" onClick={e => e.preventDefault()} />}
        onClose={() => this.setState({ error: null })}
        content={({ hide }) => (
          <div>
            {this.state.error ?
              <Message
                negative
                icon="qrcode"
                header="Invalid Address"
                content="The QR code was read but did not contain a valid address"
              />
              :
              <Message
                icon="qrcode"
                header="Scan QR Code"
                content="Present a QR code to the camera to scan for an address"
              />
            }
            <QrReader onScan={data => this.handleScan({ data, hide })} />
          </div>
        )}
      />
    );
  }
}
