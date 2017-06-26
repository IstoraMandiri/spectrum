import React, { PropTypes, Component } from 'react';
import { Header, Menu, Icon } from 'semantic-ui-react';

export default class KeystoreMenu extends Component {
  static propTypes = {
    keystoreTypes: PropTypes.array.isRequired,
    formChange: PropTypes.func.isRequired,
  }
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
  }
  handleClick(value) {
    this.props.formChange({ name: 'type', value });
  }
  renderItem({ id, name, icon, color, subtitle }) {
    return (
      <Menu.Item key={id} as="a" name={id} onClick={() => this.handleClick(id)}>
        <Header as="h4" icon style={{ height: 'auto' }}>
          <Icon name={icon} color={color} />
          {name}
          <Header.Subheader>{subtitle}</Header.Subheader>
        </Header>
      </Menu.Item>
    );
  }
  render() {
    const { keystoreTypes } = this.props;
    return (
      <Menu stackable icon="labeled" widths={keystoreTypes.length}>
        {keystoreTypes.map(this.renderItem)}
      </Menu>
    );
  }
}
