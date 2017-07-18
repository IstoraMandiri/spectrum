import React, { PropTypes, Component } from 'react';
import { Dimmer, Menu, Loader, Table } from 'semantic-ui-react';

import PaginationMenu from './pagination_menu';

export default class ReduxPaginator extends Component {
  static propTypes = {
    renderError: PropTypes.func.isRequired,
    renderLoading: PropTypes.func.isRequired,
    renderMissing: PropTypes.func.isRequired,
    actions: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    onRowClick: PropTypes.func,
  }
  static defaultProps = {
    onRowClick: undefined,
  }
  componentDidMount() {
    this.props.actions.fetchData();
  }
  renderPagination() {
    const { meta, loading } = this.props.data;
    return (
      <PaginationMenu
        fluid
        widths={3}
        currentPage={meta.page - 1}
        itemsPerPage={meta.perPage}
        total={meta.total}
        handleNavigate={dir => this.props.actions.updateConfig({ page: meta.page + dir })}
        renderCenter={({ total, firstItem, lastItem }) => (
          <Menu.Item>
            {loading && <Dimmer inverted active><Loader size="mini" /></Dimmer>}
            {firstItem} - {lastItem} of {total}
          </Menu.Item>
        )}
      />
    );
  }
  renderHeader() {
    return (
      <Table.Header>
        <Table.Row>
          {/* TODO sorting etc */}
          {this.props.columns.map(({ key, name }) => (
            <Table.HeaderCell key={key}>{name}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
    );
  }
  renderBody() {
    const { data: { items }, renderMissing, columns, onRowClick } = this.props;
    return (
      <Table.Body>
        {!items || items.length === 0 ?
          renderMissing()
        :
          items.map(item => (
            <Table.Row key={item.id} onClick={() => onRowClick(item)} style={onRowClick ? { cursor: 'pointer' } : undefined}>
              {columns.map(({ key, renderCell, cellProps }) => (
                <Table.Cell key={key} {...cellProps}>{renderCell ? renderCell(item) : item[key]}</Table.Cell>
              ))}
            </Table.Row>
          ))
        }
      </Table.Body>
    );
  }
  render() {
    const { data: { items, error, loading }, renderError, renderLoading } = this.props;
    if (error) { return renderError(); }
    if (!items && loading) { return renderLoading(); }
    return (
      <div>
        {this.renderPagination()}
        <Table selectable={!!this.props.onRowClick}>
          {this.renderHeader()}
          {this.renderBody()}
        </Table>
      </div>
    );
  }
}
