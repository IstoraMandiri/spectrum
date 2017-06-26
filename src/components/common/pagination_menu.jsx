import React, { PropTypes, Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default class PaginationMenu extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    handleNavigate: PropTypes.func.isRequired,
    disabled: PropTypes.func,
    backDisabled: PropTypes.func,
    forwardDisabled: PropTypes.func,
    total: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    renderCenter: PropTypes.func,
  };
  static defaultProps = {
    disabled: undefined,
    backDisabled: undefined,
    forwardDisabled: undefined,
    total: undefined,
    renderCenter: undefined,
  }
  render() {
    const {
      renderCenter, total, currentPage, disabled, itemsPerPage,
      handleNavigate, backDisabled, forwardDisabled, ...rest
    } = this.props;
    const firstItem = currentPage * itemsPerPage;
    const lastItem = firstItem + itemsPerPage;
    const bDisabled = currentPage === 0 || (disabled && disabled()) || (backDisabled && backDisabled());
    const fDisabled = (total && lastItem >= total) || (disabled && disabled()) || (forwardDisabled && forwardDisabled());
    return (
      <Menu {...rest} pagination size="small">
        <Menu.Item
          as="a"
          name="back"
          disabled={bDisabled}
          onClick={(e) => {
            e.preventDefault();
            if (!bDisabled) { handleNavigate(-1); }
          }}
        >
          <Icon name="step backward" />
        </Menu.Item>
        {renderCenter ?
          renderCenter({ total, firstItem, lastItem, itemsPerPage })
        :
          <Menu.Item content={`${firstItem} - ${lastItem} / ${total || '?'}`} />
        }
        <Menu.Item
          as="a"
          name="forward"
          disabled={fDisabled}
          onClick={(e) => {
            e.preventDefault();
            if (!fDisabled) { handleNavigate(1); }
          }}
        >
          <Icon name="step forward" />
        </Menu.Item>
      </Menu>

    );
  }
}
