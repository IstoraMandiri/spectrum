import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '@digix/redux-crypto-prices/src';
import { Label, Dropdown } from 'semantic-ui-react';

import { toBigNumber, parseBigNumber } from '~/helpers/stringUtils';

const { setSelectedCurrency, getPrices } = actions;

class CryptoPrice extends Component {
  static propTypes = {
    cryptoPrices: PropTypes.object.isRequired,
    getPrices: PropTypes.func.isRequired,
    setSelectedCurrency: PropTypes.func.isRequired,
    symbol: PropTypes.string,
    amount: PropTypes.number,
  };
  static defaultProps = {
    symbol: undefined,
    amount: undefined,
  }
  constructor(props) {
    super(props);
    this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
  }
  componentDidMount() {
    const { cryptoPrices: { prices } } = this.props;
    if (Object.keys(prices).length === 0) {
      this.props.getPrices();
    }
  }
  handleChangeCurrency(e, { value }) {
    this.props.setSelectedCurrency(value);
  }
  render() {
    const { symbol, cryptoPrices: { available, prices, selected }, amount, ...rest } = this.props;
    if (!prices[symbol] || !prices[selected]) { return null; }
    const ethValue = toBigNumber(amount).div(prices[symbol]);
    const targetValue = ethValue.mul(prices[selected]);
    const renderedValue = parseBigNumber(targetValue);
    return (
      <Label basic pointing {...rest}>
        <Dropdown
          scrolling
          text={`About ${renderedValue} ${selected}`}
          onChange={this.handleChangeCurrency}
          value={selected}
          options={available.map(a => ({ value: a, text: a }))}
        />
      </Label>
    );
  }
}

export default connect(
  ({ cryptoPrices }) => ({ cryptoPrices }),
  { setSelectedCurrency, getPrices },
)(CryptoPrice);
