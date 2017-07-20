import React, { PropTypes, Component } from 'react';
import { Header, Icon } from 'semantic-ui-react';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }
  render() {
    const { title, children } = this.props;
    return (
      <Header as="h2" color="green" icon textAlign="center">
        <Icon name="checkmark" />
        {title}
        <Header.Subheader>
          {children}
        </Header.Subheader>
      </Header>
    );
  }
}
