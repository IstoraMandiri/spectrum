import React, { Component, PropTypes } from 'react';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Dropdown, Loader } from 'semantic-ui-react';

import config from '~/../spectrum.config';
import Dapplet from '~/../spectrum.dapplet';

import TransactionSigningOverlay from '~/components/transactions/transaction_signing_overlay';
import MenuSystem from '~/components/common/menu_system';
import StartupOverlay from '~/components/common/startup_overlay';
import ConnectionStatus from '~/components/common/connection_status';

import Keystores from '~/components/keystores';
import Config from '~/components/config';
import Footer from '~/components/common/footer';
import SpectrumWatermark from '~/components/common/spectrum_watermark';

const menu = config.menuStyle !== 'hidden' &&
  (Dapplet ? [{
    component: Dapplet,
    name: config.dappletName || 'Dapplet',
    icon: config.dappletIcon,
    path: config.dappletPath || '/',
  }] : [])
  .concat([
    { path: '/keystores', name: 'Keystores', icon: 'key', component: Keystores },
    { path: '/config', name: 'Config', icon: 'wrench', component: Config },
    // TODO { path: '/dapplets', name: 'Dapplets', icon: 'code', component: Dapplets },
  ]);

class App extends Component {
  static propTypes = {
    ready: PropTypes.bool.isRequired,
  }
  render() {
    if (!this.props.ready) { return <Loader active />; }
    if (config.menuStyle === 'hidden') { return <Dapplet />; }
    return (
      <div className="pusher">
        <TransactionSigningOverlay />
        {config.showOverlay && <StartupOverlay />}
        <HashRouter>
          <MenuSystem
            usingRouter
            className="content"
            renderLastItem={() => <ConnectionStatus />}
            parentRoute="/"
            tabs={menu}
            {...(config.menuStyle === 'hamburger' ?
            {
              dropdown: true,
              marginTop: '4em',
              renderLastItem: () => [
                <Dropdown.Divider key="divider1" />,
                <Dropdown.Header
                  key="header"
                  className="item"
                  content={<SpectrumWatermark />}
                  as="a"
                  target="_blank"
                  rel="noopener"
                  href="https://github.com/spectrum"
                />,
                <Dropdown.Divider key="divider2" />,
              ],
              menuProps: {
                icon: 'content',
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
              menuProps: { fixed: 'top', borderless: true },
              marginTop: '5em',
            }
            )}
          />
        </HashRouter>
        { config.menuStyle !== 'hamburger' && <Footer /> }
      </div>
    );
  }
}

// only render when the redux state is ready; TODO use a flag after rehydrating
export default connect(({ orm: { Session: { itemsById: { main } } } }) => ({ ready: !!main }))(App);
