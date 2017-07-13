import React, { PropTypes, Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };
  render() {
    const message = this.props.content.message || `${this.props.content}`;
    return (
      <Message
        negative
        header="Ooops, something went wrong..."
        content={message}
        icon="warning sign"
      />
    );
  }
}
