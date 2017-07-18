import React, { PropTypes, Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Redirect, Switch, Route } from 'react-router-dom';
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
    parentRoute: PropTypes.string,
  }
  static defaultProps = {
    className: undefined,
    secondary: false,
    fixed: undefined,
    renderLastItem: undefined,
    marginTop: '1.5em',
    equalWidths: undefined,
    usingRouter: false,
    parentRoute: undefined,
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
    const { usingRouter, parentRoute, className, fixed, tabs, marginTop, equalWidths, secondary, renderLastItem } = this.props;
    const mappedTabs = tabs.map(({ name, exact, icon, component, path }, i) => {
      const absolutePath = parentRoute && path[0] !== '/' ? `${parentRoute}/${path}` : path;

      return {
        exact,
        icon,
        component,
        path: absolutePath,
        key: absolutePath,
        content: name,
        active: !usingRouter ? tab === i : undefined,
        as: usingRouter ? ActiveLink : undefined,
        to: usingRouter ? absolutePath : undefined,
        onClick: !usingRouter ? () => this.handleClick(i) : undefined,
      };
    });
    return (
      <div className={className}>
        <Menu borderless {...{ fixed, secondary }} widths={equalWidths ? tabs.length : undefined}>
          <Container>
            {mappedTabs.map(({ exact, icon, key, content, active, as, to, onClick }) => (
              <Menu.Item {...{ exact, icon, key, content, active, as, to, onClick }} />
            ))}
            {renderLastItem && renderLastItem()}
          </Container>
        </Menu>
        <Container style={{ marginTop }}>
          {usingRouter ?
            <Switch>
              {mappedTabs.map(({ key, path, component, exact }) => <Route {...{ key, path, component, exact }} />)}
              <Redirect from={parentRoute} to={mappedTabs[0].path} />
            </Switch>
            :
            tabs[tab].component
          }
        </Container>
      </div>
    );
  }
}
