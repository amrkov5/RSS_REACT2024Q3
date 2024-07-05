import { Component, ReactNode } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import getAPIData from './api';
import { APIResponse, AppState } from './types';

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchResults: null,
    };
    this.getData = this.getData.bind(this);
  }

  async getData(type: string, text: string): Promise<void> {
    this.setState({ searchResults: null });
    const result: APIResponse | void = await getAPIData(type, text);
    if (result) {
      this.setState({ searchResults: result });
    }
  }

  render(): ReactNode {
    const { searchResults } = this.state;

    return (
      <>
        <Header getData={this.getData} />
        <Main dataToPaint={searchResults} />
      </>
    );
  }
}

export default App;
