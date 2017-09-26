import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon } from 'semantic-ui-react';

export default class Advanced extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
  };
  static defaultProps = {
    title: 'Advanced',
  }

  constructor(props) {
    super(props);
    this.state = { showing: false };
    this.handleToggle = this.handleToggle.bind(this);
  }
  handleToggle() {
    this.setState({ showing: !this.state.showing });
  }
  render() {
    const { showing } = this.state;
    const { children, title } = this.props;
    return (
      <Form.Field>
        <a tabIndex={0} role="button" onClick={this.handleToggle} style={{ cursor: 'pointer' }}>
          {title} <Icon name={`caret ${showing ? 'down' : 'right'}`} />
        </a>
        {showing && children}
      </Form.Field>
    );
  }
}
