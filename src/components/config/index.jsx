import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import Networks from './networks';
import Tokens from './tokens';

export default class Config extends Component {
  render() {
    return (
      <Grid>
        <Grid.Column largeScreen={8} computer={16}>
          <Networks />
        </Grid.Column>
        <Grid.Column largeScreen={8} computer={16}>
          <Tokens />
        </Grid.Column>
      </Grid>
    );
  }
}
