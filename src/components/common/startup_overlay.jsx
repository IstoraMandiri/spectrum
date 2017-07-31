import React, { Component } from 'react';
import EZModal from 'sui-react-ezmodal';
import { Icon, Label, Message, Button } from 'semantic-ui-react';


export default class StartupOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = { hidden: false };
  }
  render() {
    return (
      <div>
        {!this.state.hidden &&
          <Label
            pointing
            icon="warning sign"
            content="Beware of phishing! Always check the URL!"
            color="purple"
            style={{ position: 'fixed', top: 0, left: 10, maxWidth: '100%', zIndex: 1002 }}
          />
        }
        <EZModal
          initiallyOpen
          header="Digix KYC Process (Early Access)"
          onClose={() => this.setState({ hidden: true })}
          content={
            <div>
              <Message error icon>
                <Icon name="warning sign" />
                <Message.Content>
                  <Message.Header content="Imprtant Big Red Warning Message (Please Read)" />
                  <ul>
                    <li>This version of Spectrum has <b>localStorage disabled</b>, as a security enhancement</li>
                    <li>
                      Spectrum has not been audited for security vulnerabilities -
                      as such, <b>do not use keystores that have any more than $10 value</b>
                    </li>
                    <li>By using this app your accpet that the developer cannot take responsibility for any losses</li>
                    <li>Ensure you are not using any dodgy chrome extensions</li>
                    <li>Tested on Chrome OSX & Android</li>
                  </ul>
                  <p>
                    * For more infromation, and to report issues please visit the
                    {' '}
                    <a
                      href="https://digix.io"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                        Digix Slack
                    </a>.
                  </p>
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
