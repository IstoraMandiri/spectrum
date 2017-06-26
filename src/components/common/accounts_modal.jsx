import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import Keystores from '../keystores';

export default class AccountsModal extends Component {
  render() {
    return (
      <EZModal
        size="large"
        basic
        content={<Keystores inverted />}
        trigger={<Button {...this.props} />}
      />
    );
  }
}
