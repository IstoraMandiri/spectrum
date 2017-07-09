import React, { Component } from 'react';
import { Button, Container, Segment, Grid } from 'semantic-ui-react';

import { version } from '~/../package.json';

import TransactionSigningOverlay from '~/components/transactions/transaction_signing_overlay';
import MenuSystem from '~/components/common/menu_system';
import StartupOverlay from '~/components/common/startup_overlay';
import ConnectionStatus from '~/components/common/connection_status';

import Keystores from '~/components/keystores';
import Config from '~/components/config';
import Dapplets from '~/components/dapplets';

const showOverlay = !__DEV__;

export default class App extends Component {
  render() {
    return (
      <div className="pusher">
        <TransactionSigningOverlay />
        {showOverlay && <StartupOverlay />}
        <MenuSystem
          className="content"
          fixed="top"
          marginTop="5em"
          renderLastItem={() => <ConnectionStatus />}
          tabs={[
            { name: 'Keystores', icon: 'key', component: <Keystores /> },
            { name: 'Config', icon: 'wrench', component: <Config /> },
            { name: 'Dapplets', icon: 'code', component: <Dapplets /> },
          ]}
        />
        <Segment inverted color="black" className="footer" secondary size="small" attached="top" compact>
          <Container>
            <Grid columns="equal" verticalAlign="middle">
              <Grid.Column>
                <Button.Group size="mini" color="grey">
                  <Button
                    icon="reddit alien"
                    as="a"
                    href="https://reddit.com/r/digix"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                  <Button
                    icon="github"
                    as="a"
                    href="https://github.com/spectrum/spectrum"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                  <Button
                    icon="line chart"
                    as="a"
                    href="https://www.cryptocompare.com/api/"
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                </Button.Group>
              </Grid.Column>
              <Grid.Column textAlign="right">
                Spectrum Dev Edition
                <br />
                v{version}
              </Grid.Column>
            </Grid>
          </Container>
        </Segment>
      </div>
    );
  }
}
