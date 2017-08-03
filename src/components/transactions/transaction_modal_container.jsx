import React, { PropTypes, Component } from 'react';
import EZModal from 'sui-react-ezmodal';

import Web3Connect from '~/helpers/web3/connect';

class TransactionModalContainer extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    web3Redux: PropTypes.object.isRequired,
    network: PropTypes.object,
    content: PropTypes.func.isRequired,
    loading: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.bool]).isRequired,
    onClose: PropTypes.func,
    header: PropTypes.string.isRequired,
    trigger: PropTypes.node.isRequired,
    data: PropTypes.object.isRequired,
    size: PropTypes.string,
    closeButtonText: PropTypes.string.isRequired,
    noSubmitButton: PropTypes.bool.isRequired,
    submitButtonText: PropTypes.string,
  }
  static defaultProps = {
    network: undefined,
    onClose: undefined,
    size: undefined,
    submitButtonText: undefined,
  }
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(formData) {
    const web3 = this.props.web3Redux.web3(formData.networkId);
    return this.props.handleSubmit(formData, web3);
  }
  render() {
    // pass web3 to the form if the network is set
    const web3 = this.props.network && this.props.web3Redux.web3(this.props.network.id);
    return (
      <EZModal
        {...{
          initiallyOpen: true,
          loading: this.props.loading,
          header: this.props.header,
          trigger: this.props.trigger,
          data: this.props.data,
          size: this.props.size,
          error: this.props.error,
          onClose: this.props.onClose,
          closeButtonText: this.props.closeButtonText,
          noSubmitButton: this.props.noSubmitButton,
          submitButtonText: this.props.submitButtonText,
          handleSubmit: this.handleSubmit,
          content: props => this.props.content({ ...props, web3 }),
        }}
      />
    );
  }
}

export default Web3Connect(TransactionModalContainer);
