import React, { PropTypes, Component } from 'react';
import { Message } from 'semantic-ui-react';

function parseContent(content) {
  if (!content) { return null; }
  if (typeof content === 'string') {
    return content;
  }
  return <pre>{JSON.stringify(content, null, 2)}</pre>;
}
export default class ErrorMessage extends Component {
  static propTypes = {
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    children: PropTypes.func,
  };
  static defaultProps = {
    children: undefined,
  }
  render() {
    const { content, children } = this.props;
    return (
      <Message
        negative
        header="Error"
        icon="warning sign"
        content={children || parseContent(content)}
      />
    );
  }
}
