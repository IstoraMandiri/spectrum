import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'semantic-ui-react';

import ErrorMessage from '~/components/common/error_message';

import signTx from './v3_sign_tx';

export default class V3KestoreTransactionSigner extends Component {
  constructor(props) {
    super(props);
    this.state = { password: '', error: false };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.setLoading('Signing...');
    this.setState({ error: false });

    setTimeout(() => {
      const throwErr = (error) => {
        this.props.setLoading(false);
        this.setState({ error });
      };
      try {
        const { address, txData } = this.props;
        const { keystore } = address;
        const { password } = this.state;
        signTx({ txData, keystore, password })
          .then(this.props.hideTxSigningModal)
          .catch(throwErr);
      } catch (error) {
        throwErr(error);
      }
    }, 10);
  }
  handleChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    const { error } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} error={!!error}>
        <Form.Field>
          <Input
            fluid
            size="large"
            onChange={this.handleChange}
            value={this.state.password}
            action={{ color: 'green', labelPosition: 'right', icon: 'checkmark', content: 'Sign Transaction' }}
            placeholder="Enter Password"
            type="password"
          />
          {error && <ErrorMessage content={error} />}
        </Form.Field>
      </Form>
    );
  }
}

V3KestoreTransactionSigner.propTypes = {
  setLoading: PropTypes.func.isRequired,
  hideTxSigningModal: PropTypes.func.isRequired,
  address: PropTypes.object.isRequired,
  txData: PropTypes.object.isRequired,
};
