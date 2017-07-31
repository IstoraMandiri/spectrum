import React, { PropTypes, Component } from 'react';
import { Dropdown, Container } from 'semantic-ui-react';

export default class MenuSystemDropdown extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }
  render() {
    const { children, ...rest } = this.props;
    return (
      <Container>
        <Dropdown {...rest}>
          <Dropdown.Menu>
            {children}
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    );
  }
}
