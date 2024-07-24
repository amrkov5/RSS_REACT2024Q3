import { connect, ConnectedProps } from 'react-redux';
import { ReactNode, useContext } from 'react';
import { toggleFetchError } from '../slices/errorSlice';
import RootState from '../slices/types';
import ErrorBoundary from './Error';
import { ThemeContext } from './ThemeContext';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface ConnectErrorProps extends PropsFromRedux {
  children: ReactNode;
  msg: string;
}

const mapStateToProps = (state: RootState) => ({
  fetchError: state.errors.fetchError,
  appError: state.errors.wholeAppError,
});

const mapDispatchToProps = {
  fetchErrorFn: toggleFetchError,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

const ConnectError = connector((props: ConnectErrorProps) => {
  const theme = useContext(ThemeContext);
  return (
    <ErrorBoundary
      fetchErrorFn={props.fetchErrorFn}
      fetchError={props.fetchError}
      appError={props.appError}
      msg={props.msg}
      theme={theme?.theme ? theme.theme : 'dark'}
    >
      {props.children}
    </ErrorBoundary>
  );
});

export default ConnectError;
