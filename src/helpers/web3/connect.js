import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps, mergeProps } from 'web3-redux/src';

export default function web3Connect(WrappedComponent) {
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(WrappedComponent);
}
