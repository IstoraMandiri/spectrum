import React, { PropTypes, Component } from 'react';
import QRCode from 'qrcode.react';
import EZModal from 'sui-react-ezmodal';

export default class QrCode extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
  }
  render() {
    return (
      <EZModal
        header="QR Code Data"
        content={<div><pre><code>{JSON.stringify(this.props.data, null, 2)}</code></pre></div>}
        trigger={(
          <div className="qr-container" style={{ cursor: 'pointer' }}>
            <QRCode value={this.props.data} size={1024} />
          </div>
        )}
      />
    );
  }
}
