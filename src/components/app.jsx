import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import { Dropdown } from 'semantic-ui-react';

import config from '~/config';

import TransactionSigningOverlay from '~/components/transactions/transaction_signing_overlay';
import MenuSystem from '~/components/common/menu_system';
import StartupOverlay from '~/components/common/startup_overlay';
import ConnectionStatus from '~/components/common/connection_status';

import Keystores from '~/components/keystores';
import Config from '~/components/config';
import Footer from '~/components/common/footer';
// TODO import Dapplets from '~/components/dapplets';

const menu = ((config.dapplet && [config.dapplet]) || []).concat([
  { path: '/keystores', name: 'Keystores', icon: 'key', component: Keystores },
  { path: '/config', name: 'Config', icon: 'wrench', component: Config },
  // TODO { path: '/dapplets', name: 'Dapplets', icon: 'code', component: Dapplets },
]);

export default class App extends Component {
  render() {
    return (
      <div className="pusher">
        <TransactionSigningOverlay />
        {config.showOverlay && <StartupOverlay />}
        {config.menuStyle === 'hidden' ?
          <config.dapplet.component />
        :
          <HashRouter>
            <MenuSystem
              usingRouter
              className="content"
              renderLastItem={() => <ConnectionStatus />}
              tabs={menu}
              {...(config.menuStyle === 'hamburger' ?
              {
                dropdown: true,
                marginTop: '4em',
                renderLastItem: () => [
                  <Dropdown.Divider />,
                  <Dropdown.Header
                    content="Powered by Spectrum"
                    as="a"
                    target="_blank"
                    rel="noopener"
                    href="https://github.com/spectrum"
                  />,
                  <Dropdown.Divider />,
                ],
                menuProps: {
                  watermark: 'Powered by Spectrum',
                  icon: 'content',
                  labelPosition: 'right',
                  floating: true,
                  button: true,
                  className: 'icon',
                  pointing: 'right',
                  size: 'small',
                  style: { right: '0.5em', top: '0.5em', position: 'fixed', zIndex: 3 },
                },
              }
              :
              {
                fixed: 'top',
                marginTop: '5em',
              }
              )}
            />
          </HashRouter>
        }
        { config.menuStyle === 'default' && <Footer /> }
      </div>
    );
  }
}
