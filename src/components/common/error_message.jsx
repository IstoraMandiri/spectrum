import React, { PropTypes, Component } from 'react';
import { Message, Icon } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };
  render() {
    const message = this.props.content.message || `${this.props.content}`;
    return (
      <Message icon error>
        <Icon name="warning sign" />
        <Message.Content>
          <Message.Header>[#35]Oops, something went wrong</Message.Header>
          {message}
        </Message.Content>
      </Message>
    );
  }
}
