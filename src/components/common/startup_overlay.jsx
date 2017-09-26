import React, { Component, cloneElement } from 'react';
import PropTypes from 'prop-types';
import EZModal from 'sui-react-ezmodal';
import { Label, Button } from 'semantic-ui-react';

export default class StartupOverlay extends Component {
  static propTypes = {
    initiallyOpen: PropTypes.bool,
    trigger: PropTypes.node.isRequired,
    title: PropTypes.string,
    content: PropTypes.node,
  }
  static defaultProps = {
    initiallyOpen: true,
    trigger: undefined,
    title: undefined,
    content: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { hidden: !this.props.initiallyOpen };
    this.handleTriggerClick = this.handleTriggerClick.bind(this);
  }
  handleTriggerClick() {
    this.setState({ hidden: false });
  }
  render() {
    const { trigger, content, title } = this.props;
    const wrappedTrigger = trigger && cloneElement(trigger, { onClick: this.handleTriggerClick });
    if (this.state.hidden) { return wrappedTrigger; }
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
          trigger={wrappedTrigger}
          closeOnDimmerClick={false}
          header={title || 'Spectrum'}
          onClose={() => { this.setState({ hidden: true }); }}
          content={
            <div
              style={{
                maxHeight: '50vh',
                overflowY: 'scroll',
                background: 'rgba(0,0,0,.05)',
                padding: '1em',
              }}
            >
              {content || <p>TODO: Default TOS</p>}
            </div>
          }
          actions={({ hide }) => (
            <Button
              onClick={hide}
              color="green"
              icon="checkmark"
              content="I have read and agree"
              labelPosition="right"
            />
          )}
        />
      </div>
    );
  }
}
