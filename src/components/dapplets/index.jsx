import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import Lazyload from '~/components/common/lazyload';

import MenuSystem from '~/components/common/menu_system';

const EtcRedemption = Lazyload(() => System.import('@digix/etc-redemption/spectrum'));

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
            usingRouter
            parentRoute="/dapplets"
            tabs={[
              {
                name: 'ETC Redemption',
                icon: 'fork',
                component: EtcRedemption,
                path: 'etc-redemption',
              },
            ]}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
