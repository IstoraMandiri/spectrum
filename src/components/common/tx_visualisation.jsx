import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Image, Grid, Icon, Header } from 'semantic-ui-react';

import blockie from '~/helpers/blockie';

export default class TxVisualisation extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
  }
  renderItem({ header, item, icon, identicon, image, subheader, data, color, dataLink, noTruncate }, i) {
    return (
      <Grid.Column textAlign="center" key={i}>
        <Header as="h2" color={color} icon style={{ maxWidth: '100%' }}>
          {identicon && <Image src={blockie(identicon)} style={{ height: '1em' }} className="icon" />}
          {image && <Image src={image} style={{ height: '1em' }} className="icon" />}
          {icon && <Icon name={icon} />}
          <span className={!noTruncate ? 'truncated' : undefined}>{header}</span>
          <Header.Subheader>
            <b className={!noTruncate ? 'truncated' : undefined}>{subheader}</b>
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
