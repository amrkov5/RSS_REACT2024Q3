import { connect } from 'react-redux';
import { toggleFetchError } from '../slices/errorSlice';
import RootState from '../slices/types';
import ErrorBoundary from './Error';

const mapStateToProps = (state: RootState) => ({
  fetchError: state.errors.fetchError,
  appError: state.errors.wholeAppError,
});

const mapDispatchToProps = {
  fetchErrorFn: toggleFetchError,
};

const ConnectError = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBoundary);

export default ConnectError;
