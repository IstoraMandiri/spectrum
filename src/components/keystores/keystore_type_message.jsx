import React, { PropTypes, Component } from 'react';
import { Icon, Message } from 'semantic-ui-react';

export default class KeystoreTypeMessage extends Component {
  static propTypes = {
    keystoreType: PropTypes.object.isRequired,
  }
  render() {
    const { keystoreType } = this.props;
    return (
      <Message info icon>
        <Icon name={keystoreType.icon || 'info circle'} />
        <Message.Content>
          <Message.Header>{keystoreType.name}</Message.Header>
          {keystoreType.description}
        </Message.Content>
      </Message>
    );
  }
}
