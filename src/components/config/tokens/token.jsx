import React, { PropTypes, Component } from 'react';
import { Table, Header, Image, Label } from 'semantic-ui-react';
import EZModal from 'sui-react-ezmodal';

import blockie from '~/helpers/blockie';

import TokenForm from './token_form';

export default class Token extends Component {
  static propTypes = {
    token: PropTypes.object.isRequired,
    updateToken: PropTypes.func.isRequired,
    deleteToken: PropTypes.func.isRequired,
  }
  render() {
    const { token, updateToken, deleteToken } = this.props;
    return (
      <EZModal
        key={token.id}
        header={`Edit Token: ${token.name}`}
        data={{ ...token, network: token.network.id }}
        trigger={
          <Table.Row>
            <Table.Cell>
              <Header as="h4" image>
                <Image src={blockie(token.address)} shape="rounded" size="mini" />
                <Header.Content>
                  {token.name}
                  <Label content={token.symbol} color={token.color} size="small" />
                  <Header.Subheader>{token.address}</Header.Subheader>
                </Header.Content>
              </Header>
            </Table.Cell>
            <Table.Cell>
              <Label content={token.network.name} color={token.network.color} />
            </Table.Cell>
          </Table.Row>
        }
        handleSubmit={updateToken}
        handleRemove={() => deleteToken(token.id)}
        content={props => <TokenForm {...props} />}
      />
    );
  }
}
