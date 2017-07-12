import React, { PropTypes, Component } from 'react';
import { Progress, Divider, Input, Form, Button } from 'semantic-ui-react';
import BigNumber from 'bignumber.js';
import EZModal from 'sui-react-ezmodal';

import DropdownSelector from './dropdown_selector';

/* eslint-disable max-len */
const charMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
/* eslint-enable max-len */

const initialState = { rolls: [], currentRoll: '', result: null };

export default class EntropyGenerator extends Component {
  static propTypes = {
    bits: PropTypes.number,
    handleSubmit: PropTypes.func.isRequired,
  };
  static defaultProps = {
    bits: 256,
  }

  constructor(props) {
    super(props);
    this.state = initialState;
    this.renderContent = this.renderContent.bind(this);
    this.handleEnterRoll = this.handleEnterRoll.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleEnterRoll({ e, hide, formData: { base, bits } }) {
    e.preventDefault();
    e.stopPropagation();
    const { rolls: oldRolls, currentRoll, result } = this.state;
    if (result) { return null; }
    const requiredItems = Math.ceil(bits / Math.log2(base)) + 1; // 1 extra for initial XOR
    this.setState({ currentRoll: '' });
    // validate
    const input = parseInt(currentRoll, 10);
    const char = input && input <= base && charMap[input - 1];
    if (!char) {
      this.setState({ error: 'Ignored Invalid Roll' });
      return null;
    }
    const rolls = oldRolls.concat([char]);
    this.setState({ rolls });
    if (rolls.length >= requiredItems) {
      // do the xor
      const newResult = rolls.slice(0, rolls.length - 1).map((roll, i) => {
        const a = new BigNumber(roll, 16).toString(2);
        const b = new BigNumber(rolls[i + 1], 16).toString(2);
        const aBinary = `${new Array(4 - a.length).fill(0).join('')}${a}`;
        const bBinary = `${new Array(4 - b.length).fill(0).join('')}${b}`;
        const xorBinary = aBinary.split('').map((ba, j) => (ba !== bBinary[j] ? '1' : '0')).join('');
        return new BigNumber(xorBinary, 2).toString(16);
      }).join('');
      this.props.handleSubmit(newResult);
      hide();
    }
    return null;
  }
  handleChange({ target: { value: currentRoll } }) {
    this.setState({ currentRoll });
  }
  renderContent({ hide, formData, formChange }) {
    const { bits, base } = formData;
    const rolls = Math.ceil(bits / Math.log2(base)) + 1;
    return (
      <Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label htmlFor="base">[#83]Bits of Entropy</label>
            <DropdownSelector
              name="bits"
              items={[
                { id: 32, name: '32 bits (8 hex chars)' },
                { id: 64, name: '64 bits (16 hex chars)' },
                { id: 128, name: '128 bits (32 hex chars)' },
                { id: 256, name: '[#85]256 bits (64 hex chars)' },
                { id: 512, name: '512 bits (128 hex chars)' },
              ]}
              {...{ formChange, formData }}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor="base">[#84]Base Unit (Sides on the dice)</label>
            <DropdownSelector
              name="base"
              items={[
                { id: 2, name: 'Coin Flip (1 = heads, 2 = tails)' },
                { id: 4, name: 'Less than 8 sided dice' },
                { id: 8, name: '8-15 sided dice' },
                { id: 16, name: '[#86]16-31 sided dice' },
                { id: 32, name: '32 sided dice' },
              ]}
              {...{ formChange, formData }}
            />
          </Form.Field>
        </Form.Group>
        <Form onSubmit={e => this.handleEnterRoll({ e, hide, formData, formChange })}>
          <Form.Field>
            <label htmlFor={'rolls'}>[#87]Roll dice and input results (1 - {base}) [#89]by pressing enter each time</label>
            {/* TODO checkbox to toggle <password></password> */}
            <Input
              placeholder={`[#88]Roll ${this.state.rolls.length + 1}`}
              value={this.state.currentRoll}
              size="huge"
              onChange={this.handleChange}
            />
            <Divider hidden />
            <Progress
              indicating
              percent={Math.round((this.state.rolls.length / rolls) * 100)}
            >
              {this.state.rolls.length} / {rolls} rolls
            </Progress>
          </Form.Field>
          <button style={{ visibility: 'hidden' }} type="submit" />
        </Form>
      </Form.Field>
    );
  }
  render() {
    return (
      <EZModal
        closeButtonText="[#90]Cancel"
        size="small"
        data={{ bits: this.props.bits, base: 16 }}
        trigger={<Button content="🎲" basic onClick={e => e.preventDefault()} />}
        header="[#82]Manually Input Random Data Source"
        content={this.renderContent}
        noSubmitButton
        handleSubmit={() => {}}
        onClose={() => this.setState(initialState)}
      />
    );
  }
}
