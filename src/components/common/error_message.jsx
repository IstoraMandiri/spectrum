import React, { PropTypes, Component } from 'react';
import { Message } from 'semantic-ui-react';

export default class ErrorMessage extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  };
  render() {
    const { content } = this.props;
    const message = typeof content === 'string' ? content : (content.message || `${content}`);
    return (
      <Message
        negative
        header="Oops, something went wrong..."
        content={message}
        icon="warning sign"
      />
    );
  }
}
