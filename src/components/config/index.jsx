import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Networks from './networks';
import Tokens from './tokens';

export default class Config extends Component {
  render() {
    return (
      <Grid stackable columns={2}>
        <Grid.Column>
          <Networks />
        </Grid.Column>
        <Grid.Column>
          <Tokens />
        </Grid.Column>
      </Grid>
    );
  }
}
