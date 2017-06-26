import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import EtcRedemption from '@digix/etc-redemption/spectrum';

import MenuSystem from '~/components/common/menu_system';
import Signer from './signer';

export default class Dapplets extends Component {
  static propTypes = {

  }
  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header>
            Dapplets
            <Header.Subheader>
              Sample of some Dapplets built in spectrum. This section will soon be replaced with an on-chain registry.
            </Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={16}>
          <MenuSystem
            secondary
            tabs={[
              { name: 'Transaction Signer', icon: 'pencil', component: <Signer /> },
              { name: 'ETC Redemption', icon: 'fork', component: <EtcRedemption /> },
            ]}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
