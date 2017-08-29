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
    actions: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.bool]),
    txHash: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    closeOnDimmerClick: PropTypes.bool,
    failure: PropTypes.bool,
  }
  static defaultProps = {
    network: undefined,
    onClose: undefined,
    size: undefined,
    submitButtonText: undefined,
    actions: undefined,
    txHash: undefined,
    failure: false,
    closeOnDimmerClick: true,
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
    const { txHash, failure } = this.props;
    return (
      <EZModal
        {...{
          initiallyOpen: true,
          loading: this.props.loading,
          header: this.props.header,
          trigger: this.props.trigger,
          data: this.props.data,
          size: this.props.size,
          closeOnDimmerClick: this.props.closeOnDimmerClick,
          error: this.props.error,
          onClose: this.props.onClose,
          closeButtonText: this.props.closeButtonText,
          noSubmitButton: this.props.noSubmitButton,
          submitButtonText: this.props.submitButtonText,
          actions: this.props.actions && (props => this.props.actions({ ...props, web3, txHash, failure })),
          handleSubmit: this.handleSubmit,
          content: props => this.props.content({ ...props, web3, failure }),
        }}
      />
    );
  }
}

export default Web3Connect(TransactionModalContainer);
