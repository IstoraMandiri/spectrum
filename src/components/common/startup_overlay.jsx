import React, { Component } from 'react';
import EZModal from 'sui-react-ezmodal';
import { Icon, Label, Message, Button } from 'semantic-ui-react';

import config from '~/config';

export default class StartupOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }
  render() {
    if (this.state.hidden) { return null; }
    return (
      <div>
        <Label
          pointing
          icon="warning sign"
          content="Beware of phishing! Always check the URL!"
          color="purple"
          style={{ position: 'fixed', top: 0, left: 10, maxWidth: '100%', zIndex: 1002 }}
        />
        <EZModal
          initiallyOpen
          header={config.overlay.header}
          onClose={() => this.setState({ hidden: true })}
          content={
            <div>
              <Message error icon>
                <Icon name="warning sign" />
                <Message.Content>
                  <Message.Header content="Imprtant Big Red Warning Message (Please Read)" />
                  {config.overlay.content}
                </Message.Content>
              </Message>
            </div>
          }
          actions={({ hide }) => (
            <Button
              onClick={hide}
              content="I have read the above"
              color="green"
              icon="checkmark"
            />
          )}
        />
      </div>
    );
  }
}
