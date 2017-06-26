import React, { PropTypes, Component } from 'react';
import { Icon, Table, Header, Image } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import blockie from '~/helpers/blockie';
import QrCode from '~/components/common/qr_code';

import AddressBalances from './address_balances';

export default class KeystoreAddress extends Component {
  static propTypes = {
    address: PropTypes.object.isRequired,
  };
  render() {
    const { address } = this.props;
    return (
      <Table.Row>
        <Table.Cell width="1">
          <Header as="h4" image style={{ whiteSpace: 'nowrap' }}>
            <Image src={blockie(address.address)} shape="rounded" size="mini" />
            <Header.Content>
              {address.name}
              <Header.Subheader>
                <code style={{ fontSize: '0.8em' }}>{address.address}</code>
                <EZModal
                  size="small"
                  header={address.name}
                  content={<QrCode data={address.address} />}
                  trigger={<Icon name={'qrcode'} style={{ cursor: 'pointer' }} />}
                />
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Table.Cell>
        <AddressBalances address={address} />
      </Table.Row>
    );
  }
}
