import { connect } from 'react-redux';
import { web3Connect } from 'web3-redux';

export default function (WrappedComponent) {
  return web3Connect(connect, WrappedComponent);
}
