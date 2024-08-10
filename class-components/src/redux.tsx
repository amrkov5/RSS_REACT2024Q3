import { ComponentType } from 'react';
import { Provider } from 'react-redux';
import store from './store';

const withRedux = <P extends object>(
  Component: ComponentType<P>
): ComponentType<P> => {
  function Wrapper(props: P) {
    return (
      <Provider store={store}>
        <Component {...props} />
      </Provider>
    );
  }

  return Wrapper;
};

export default withRedux;
