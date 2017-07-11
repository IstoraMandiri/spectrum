import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Form, Label } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import { getNetworksWithTokens, getDefaultNetworks } from '~/selectors';

import ButtonSelector from './button_selector';

class NetworkTokensSelector extends Component {
  static propTypes = {
    formData: PropTypes.object.isRequired,
    formChange: PropTypes.func.isRequired,
    modal: PropTypes.bool,
    modalButtonSize: PropTypes.string,
    networks: PropTypes.array.isRequired,
    defaultNetworks: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    noTokens: PropTypes.bool,
    label: PropTypes.string,
    singleSelection: PropTypes.bool,
    noNetworks: PropTypes.bool,
  };
  static defaultProps = {
    modal: undefined,
    modalButtonSize: undefined,
    disabled: undefined,
    noTokens: undefined,
    noNetworks: undefined,
    singleSelection: undefined,
    label: '[#26]Select Network(s)',
  }
  constructor(props) {
    super(props);
    this.renderTokenGroup = this.renderTokenGroup.bind(this);
  }
  componentDidMount() {
    const { networks, singleSelection, defaultNetworks, formChange, formData } = this.props;
    // set the default network if it's not defined (can be blank array if no networks set)
    if (singleSelection) { return null; }
    if (!formData.networks) {
      formChange({ target: { value: defaultNetworks, name: 'networks' } });
    }
    // get default tokens
    if (!formData.tokens) {
      const defaultTokens = networks.reduce((o, network) => (
        o.concat(network.tokens.map(token => token.default && token.id).filter(a => a))
      ), []);
      setTimeout(() => formChange({ target: { value: defaultTokens, name: 'tokens' } }), 1);
    }
    return null;
  }
  getSelectedNetworks() {
    const { networks, formData } = this.props;
    return (networks || []).filter(n => (formData.networks || []).indexOf(n.id) !== -1);
  }
  renderTokenGroup(network) {
    const { formChange, formData } = this.props;
    if (!network.tokens.length) { return null; }
    return (
      <ButtonSelector
        key={network.id}
        props={{ size: 'mini', className: 'padded' }}
        label={`[#31]Select ${network.name} [#32]token(s)`}
        name="tokens"
        items={network.tokens}
        {...{ formChange, formData }}
      />
    );
  }
  renderContent() {
    const { singleSelection, formChange, noNetworks, noTokens, formData, networks, label } = this.props;
    const selectedNetworks = this.getSelectedNetworks();
    return (
      <Form.Field>
        {!noNetworks && networks &&
          <ButtonSelector
            label={label}
            name="networks"
            items={networks}
            {...{ formChange, formData, singleSelection }}
          />
        }
        {!noTokens && selectedNetworks.map(this.renderTokenGroup)}
      </Form.Field>
    );
  }
  renderLabel() {
    const selectedNetworks = this.getSelectedNetworks().length;
    return (
      <Label as="a" color={selectedNetworks ? 'orange' : undefined} size={this.props.modalButtonSize}>
        {selectedNetworks}
        <Label.Detail>[#41]Networks</Label.Detail>
      </Label>
    );
  }
  renderModalButton() {
    const { formData } = this.props;
    if (this.props.disabled) { return this.renderLabel(); }
    return (
      <EZModal
        noCloseButton
        header={`Edit Networks for: ${formData.name || 'New Account'}`}
        content={<Form onSubmit={e => e.preventDefault()}>{this.renderContent()}</Form>}
        trigger={this.renderLabel()}
      />
    );
  }
  render() {
    return this.props.modal ? this.renderModalButton() : this.renderContent();
  }
}

export default connect(state => ({
  networks: getNetworksWithTokens(state),
  defaultNetworks: getDefaultNetworks(state),
}))(NetworkTokensSelector);
