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
    label: 'Select Network(s)',
  }
  constructor(props) {
    super(props);
    this.renderTokenGroup = this.renderTokenGroup.bind(this);
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
        label={`Select ${network.name} token(s)`}
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
  renderTrigger() {
    const selectedNetworks = this.getSelectedNetworks().length;
    return (
      <Label as="a" color={selectedNetworks ? 'orange' : undefined} size={this.props.modalButtonSize}>
        {selectedNetworks}
        <Label.Detail>Networks</Label.Detail>
      </Label>
    );
  }
  renderModalButton() {
    const { formData } = this.props;
    if (this.props.disabled) { return this.renderTrigger(); }
    return (
      <EZModal
        noCloseButton
        header={`Edit Networks for: ${formData.name || 'New Account'}`}
        content={<Form onSubmit={e => e.preventDefault()}>{this.renderContent()}</Form>}
        trigger={this.renderTrigger()}
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
