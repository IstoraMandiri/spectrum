import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';

import TransactionSigningOverlay from '~/components/transactions/transaction_signing_overlay';
import MenuSystem from '~/components/common/menu_system';
import StartupOverlay from '~/components/common/startup_overlay';
import ConnectionStatus from '~/components/common/connection_status';

import Keystores from '~/components/keystores';
import Config from '~/components/config';
import Dapplets from '~/components/dapplets';
import Footer from '~/components/common/footer';

const showOverlay = process.env.NODE_ENV === 'production';

export default class App extends Component {
  render() {
    return (
      <div className="pusher">
        <TransactionSigningOverlay />
        {showOverlay && <StartupOverlay />}
        <HashRouter>
          <MenuSystem
            usingRouter
            className="content"
            fixed="top"
            marginTop="5em"
            renderLastItem={() => <ConnectionStatus />}
            tabs={[
              { exact: true, path: '/', name: 'Keystores', icon: 'key', component: Keystores },
              { path: '/config', name: 'Config', icon: 'wrench', component: Config },
              { path: '/dapplets', name: 'Dapplets', icon: 'code', component: Dapplets },
            ]}
          />
        </HashRouter>
        <Footer />
      </div>
    );
  }
}
