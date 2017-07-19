import React, { PropTypes, Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';

export default class PaginationMenu extends Component {
  static propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    handleNavigate: PropTypes.func.isRequired,
    disabled: PropTypes.func,
    handleWarp: PropTypes.func,
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
    handleWarp: undefined,
    renderCenter: undefined,
  }
  render() {
    const {
      renderCenter, total, currentPage, disabled, itemsPerPage, handleWarp,
      handleNavigate, backDisabled, forwardDisabled, ...rest
    } = this.props;
    const firstItem = currentPage * itemsPerPage;
    const lastPageItem = firstItem + itemsPerPage;
    const lastItem = lastPageItem > total ? total : lastPageItem;
    const bDisabled = currentPage === 0 || (disabled && disabled()) || (backDisabled && backDisabled());
    const fDisabled = (total && lastItem >= total) || (disabled && disabled()) || (forwardDisabled && forwardDisabled());
    const totalPages = total && Math.ceil(total / itemsPerPage);
    return (
      <Menu {...rest} pagination size="small">
        {total &&
          <Menu.Item
            as="a"
            name="fast backward"
            disabled={bDisabled}
            onClick={(e) => {
              e.preventDefault();
              if (!bDisabled) { handleWarp(1); }
            }}
          >
            <Icon name="fast backward" />
          </Menu.Item>
        }
        <Menu.Item
          as="a"
          name="warpback"
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
        {total &&
          <Menu.Item
            as="a"
            name="warpfroward"
            disabled={fDisabled}
            onClick={(e) => {
              e.preventDefault();
              if (!fDisabled) { handleWarp(totalPages); }
            }}
          >
            <Icon name="fast forward" />
          </Menu.Item>
        }
      </Menu>

    );
  }
}
