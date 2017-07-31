import React, { PropTypes, Component } from 'react';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { Redirect, Switch, Route } from 'react-router-dom';
import ActiveLink from '~/components/common/active_link';

import MenuSystemDropdown from './menu_system_dropdown';

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
    childProps: PropTypes.object,
    menuProps: PropTypes.object,
    renderFooter: PropTypes.func,
    renderTab: PropTypes.func,
    hidden: PropTypes.bool,
    dropdown: PropTypes.ptb,
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
    childProps: undefined,
    menuProps: undefined,
    renderFooter: undefined,
    renderTab: undefined,
    dropdown: false,
    hidden: false,
  }
  constructor(props) {
    super(props);
    this.state = { tab: 0 };
  }
  handleClick(tab) {
    this.setState({ tab });
  }
  renderItems(mappedTabs) {
    const { renderTab, dropdown } = this.props;
    const ItemComp = dropdown ? Dropdown.Item : Menu.Item;
    return mappedTabs.map(({ hidden, exact, icon, key, content, active, as, to, onClick, disabled, props }) => {
      if (hidden) { return null; }
      if (renderTab) { return renderTab({ exact, icon, key, content, active, as, to, onClick, disabled, ...props }); }
      return <ItemComp {...{ exact, icon, key, content, active, as, to, onClick, disabled, ...props }} />;
    });
  }
  render() {
    const { tab } = this.state;
    const {
      childProps,
      usingRouter,
      menuProps,
      parentRoute,
      className,
      fixed,
      tabs,
      marginTop,
      equalWidths,
      secondary,
      renderFooter,
      renderLastItem,
      dropdown,
    } = this.props;
    const MenuComp = dropdown ? MenuSystemDropdown : Menu;
    const mappedTabs = tabs.map(({ name, hidden, exact, icon, component, path, props }, i) => {
      const absolutePath = parentRoute && path[0] !== '/' ? `${parentRoute}/${path}` : path;
      return {
        exact,
        icon,
        component,
        hidden,
        props,
        path: absolutePath,
        key: absolutePath,
        content: name,
        active: !usingRouter ? tab === i : undefined,
        as: usingRouter ? ActiveLink : undefined,
        to: usingRouter ? absolutePath : undefined,
        onClick: () => this.handleClick(i),
      };
    });
    return (
      <div className={className}>
        {!this.props.hidden &&
          <MenuComp
            widths={equalWidths ? tabs.filter(t => !t.hidden).length : undefined}
            {...{ fixed, secondary }}
            {...menuProps}
          >
            {dropdown ?
              this.renderItems(mappedTabs).concat((renderLastItem && renderLastItem()) || [])
            :
              <Container>
                {this.renderItems(mappedTabs)}
                {renderLastItem && renderLastItem()}
              </Container>
            }
          </MenuComp>
        }
        <Container style={{ marginTop: !this.props.hidden ? marginTop : undefined }}>
          {usingRouter ?
            <Switch>
              {mappedTabs.map(({ key, path, component: Comp, exact, props }) => (
                <Route
                  {...{
                    key,
                    path,
                    component: !childProps ? Comp : undefined,
                    render: !childProps ? undefined : () => <Comp {...childProps} {...props} />,
                    exact,
                  }}
                />
              ))}
              <Redirect from={parentRoute} to={mappedTabs[0].path} />
            </Switch>
            :
            tabs[tab].component
          }
          {renderFooter && renderFooter(tab)}
        </Container>
      </div>
    );
  }
}
