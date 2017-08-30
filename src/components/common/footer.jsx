import React, { Component } from 'react';
import { Segment, Container, Grid, Button } from 'semantic-ui-react';

import SpectrumWatermark from '~/components/common/spectrum_watermark';

export default class Footer extends Component {
  render() {
    return (
      <Segment inverted color="black" className="footer" secondary size="small" attached="top" compact>
        <Container>
          <Grid columns="equal" verticalAlign="middle">
            <Grid.Column>
              <Button.Group size="mini" color="grey">
                <Button
                  icon="reddit alien"
                  as="a"
                  href="https://reddit.com/r/digix"
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Button
                  icon="github"
                  as="a"
                  href="https://github.com/spectrum/spectrum"
                  rel="noopener noreferrer"
                  target="_blank"
                />
                <Button
                  icon="line chart"
                  as="a"
                  href="https://www.cryptocompare.com/api/"
                  rel="noopener noreferrer"
                  target="_blank"
                />
              </Button.Group>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <SpectrumWatermark />
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    );
  }
}
