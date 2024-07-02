import { Component, ReactNode } from 'react';
import Header from './components/Header';
import Main from './components/Main';

class App extends Component {
  render(): ReactNode {
    return (
      <>
        <Header />
        <Main />
      </>
    );
  }
}

export default App;
