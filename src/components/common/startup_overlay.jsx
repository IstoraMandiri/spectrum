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
          header="Welcome to Spectrum (Developer Edtition)"
          onClose={() => this.setState({ hidden: true })}
          content={
            <div>
              <Message error icon>
                <Icon name="warning sign" />
                <Message.Content>
                  <Message.Header content="Important Message (Please Read) - Terms and Conditions" />
                  <ul>
                    <li>This is the first open source release of Spectrum, and is <b>intended for developers only</b></li>
                    <li><b>Do not use this version for anything more than testing or developing</b></li>
                    <li>This version of Spectrum has <b>localStorage enabled</b>, which is a feature to aid development</li>
                    <li>Test coverage is not complete in Spectrum, nor has it been audited for security vulnerabilities</li>
                    <li>As such, <b>do not use keystores that have more than $10 in value</b></li>
                    <li>By using this app, you accept that the developer and/or authors will be liable for any claim, damages or other liability</li>
                    <li>Tested on Chrome OSX & Android</li>
                  </ul>
                  <p>
                    * For more infromation, and to report issues (for a bounty), please visit the
                    {' '}
                    <a
                      href="https://github.com/spectrum/spectrum"
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
              content="I have read the above terms"
              color="green"
              icon="checkmark"
            />
          )}
        />
      </div>
    );
  }
}
