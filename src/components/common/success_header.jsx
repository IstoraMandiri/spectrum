import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

export default class extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    failure: PropTypes.bool,
  }
  static defaultProps = {
    failure: false,
  }
  render() {
    const { title, children, failure } = this.props;
    return (
      <Header as="h2" color={failure ? 'red' : 'green'} icon textAlign="center">
        <Icon name={failure ? 'remove' : 'checkmark'} />
        {title}
        <Header.Subheader>
          {children}
        </Header.Subheader>
      </Header>
    );
  }
}
