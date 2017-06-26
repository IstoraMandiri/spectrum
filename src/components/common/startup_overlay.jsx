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
          header="Welcome to Spectrum (Developer Release)"
          onClose={() => this.setState({ hidden: true })}
          content={
            <div>
              <Message error icon>
                <Icon name="warning sign" />
                <Message.Content>
                  <Message.Header content="Imprtant Big Red Warning Message (Please Read)" />
                  <ul>
                    <li>Tested on Chrome OSX & Android</li>
                    <li>TODO!</li>
                  </ul>
                  <p>
                    * For more infromation, including alternative redemption methods, please check the
                    {' '}
                    <a
                      href="https://github.com/digixglobal/spectrum"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                        Github Repo
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
