import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Table, Button, Header } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import { createToken, updateToken, deleteToken } from '~/actions/token';
import { getTokens } from '~/selectors';

import Token from './token';
import TokenForm from './token_form';

class Tokens extends Component {
  static propTypes = {
    tokens: PropTypes.array.isRequired,
    createToken: PropTypes.func.isRequired,
    updateToken: PropTypes.func.isRequired,
    deleteToken: PropTypes.func.isRequired,
  }
  renderTokens() {
    return this.props.tokens.map(token => (
      <Token key={token.id} token={token} updateToken={this.props.updateToken} deleteToken={this.props.deleteToken} />
    ));
  }
  render() {
    return (
      <Grid>
        <Grid.Column width={7}>
          <Header>
            [#62]Tokens
            <Header.Subheader>[#63]Configure Available Token Assets</Header.Subheader>
          </Header>
        </Grid.Column>
        <Grid.Column width={9} textAlign="right">
          <EZModal
            header="Add Token"
            trigger={<Button basic icon="plus" content="[#64]Create" />}
            handleSubmit={this.props.createToken}
            content={props => <TokenForm {...props} />}
          />
        </Grid.Column>
        <Grid.Column width={16}>
          <Table selectable style={{ cursor: 'pointer' }}>
            <Table.Body>
              {this.renderTokens()}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({ tokens: getTokens(state) });

export default connect(mapStateToProps, { createToken, updateToken, deleteToken })(Tokens);
