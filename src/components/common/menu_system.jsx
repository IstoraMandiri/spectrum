import React, { PropTypes, Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';

export default class MenuSystem extends Component {
  static propTypes = {
    secondary: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    className: PropTypes.string,
    fixed: PropTypes.string,
    renderLastItem: PropTypes.func,
    marginTop: PropTypes.string,
    equalWidths: PropTypes.bool,
  }
  static defaultProps = {
    className: undefined,
    secondary: false,
    fixed: undefined,
    renderLastItem: undefined,
    marginTop: '1.5em',
    equalWidths: undefined,
  }
  constructor(props) {
    super(props);
    this.state = { tab: 0 };
  }
  handleClick(tab) {
    this.setState({ tab });
  }
  render() {
    const { tab } = this.state;
    const { className, fixed, tabs, marginTop, equalWidths, secondary, renderLastItem } = this.props;
    return (
      <div className={className}>
        <Menu borderless {...{ fixed, secondary }} widths={equalWidths ? tabs.length : undefined}>
          <Container>
            {tabs.map(({ icon, name }, i) => (
              <Menu.Item
                icon={icon}
                key={name}
                content={name}
                active={tab === i}
                onClick={() => this.handleClick(i)}
              />
            ))}
            {renderLastItem && renderLastItem()}
          </Container>
        </Menu>
        <Container style={{ marginTop }}>
          {tabs[tab].component}
        </Container>
      </div>
    );
  }
}
