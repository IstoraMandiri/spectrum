import React, { PropTypes, Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Switch, Route } from 'react-router-dom';
import ActiveLink from '~/components/common/active_link';

export default class MenuSystem extends Component {
  static propTypes = {
    secondary: PropTypes.bool,
    tabs: PropTypes.array.isRequired,
    className: PropTypes.string,
    fixed: PropTypes.string,
    renderLastItem: PropTypes.func,
    marginTop: PropTypes.string,
    equalWidths: PropTypes.bool,
    usingRouter: PropTypes.bool,
  }
  static defaultProps = {
    className: undefined,
    secondary: false,
    fixed: undefined,
    renderLastItem: undefined,
    marginTop: '1.5em',
    equalWidths: undefined,
    usingRouter: false,
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
    const { usingRouter, className, fixed, tabs, marginTop, equalWidths, secondary, renderLastItem } = this.props;
    return (
      <div className={className}>
        <Menu borderless {...{ fixed, secondary }} widths={equalWidths ? tabs.length : undefined}>
          <Container>
            {tabs.map(({ icon, name, path, exact }, i) => (
              <Menu.Item
                exact={exact}
                icon={icon}
                key={name}
                content={name}
                active={!usingRouter ? tab === i : undefined}
                as={usingRouter ? ActiveLink : undefined}
                to={usingRouter ? path : undefined}
                onClick={!usingRouter ? () => this.handleClick(i) : undefined}
              />
            ))}
            {renderLastItem && renderLastItem()}
          </Container>
        </Menu>
        <Container style={{ marginTop }}>
          {usingRouter ?
            <Switch>
              {tabs.map(({ path, component, exact }) => <Route key={path} {...{ path, component, exact }} />)}
            </Switch>
          :
            tabs[tab].component
          }
        </Container>
      </div>
    );
  }
}
