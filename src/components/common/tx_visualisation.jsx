import React, { PropTypes, Component } from 'react';

import { Grid, Icon, Header } from 'semantic-ui-react';

export default class TxVisualisation extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }
  renderItem({ header, item, icon, subheader, data, color, dataLink }, i) {
    return (
      <Grid.Column textAlign="center" key={i}>
        <Header as="h2" color={color} icon style={{ maxWidth: '100%' }}>
          <Icon name={icon} />
          <span className="truncated">{header}</span>
          <Header.Subheader>
            <b className="truncated">{subheader}</b>
            <br />
            {dataLink ?
              <a className="truncated" rel="noopener noreferrer" target="_blank" href={dataLink}>{data}</a>
              :
              <span className="truncated">{data}</span>
            }
          </Header.Subheader>
        </Header>
      </Grid.Column>
    );
  }
  render() {
    const { items } = this.props;
    return (
      <Grid verticalAlign="middle" columns={items.length} centered>
        {items.map(this.renderItem)}
      </Grid>
    );
  }
}
