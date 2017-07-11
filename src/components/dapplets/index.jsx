import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';

import Lazyload from '~/components/common/lazyload';

import MenuSystem from '~/components/common/menu_system';
import Placeholder from './placeholder';

const EtcRedemption = Lazyload(() => System.import('@digix/etc-redemption/spectrum'));
// const DigixKyc = Lazyload(() => System.import('@digix/etc-redemption/spectrum'));


export default class Dapplets extends Component {
  static propTypes = {

  }
  render() {
    return (
      <Grid>
        <Grid.Column width={16}>
          <Header>
            [#71]Dapplets
            <Header.Subheader>
              [#72]Sample of some Dapplets built in spectrum. This section will soon be replaced with an on-chain registry.
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
                name: '[#73]KYC Verification',
                icon: 'user',
                component: Placeholder,
                path: '/dapplets/kyc',
              },
              {
                name: '[#74]ETC Redemption',
                icon: 'fork',
                component: EtcRedemption,
                path: '/dapplets/etc-redemption',
              },
            ]}
          />
        </Grid.Column>
      </Grid>
    );
  }
}
