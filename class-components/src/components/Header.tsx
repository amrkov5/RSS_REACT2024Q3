import { Component, ReactNode } from 'react';
import { GetData, HeaderState } from '../types';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';

class Header extends Component<GetData, HeaderState> {
  constructor(props: GetData) {
    super(props);
    this.state = {
      type: 'people',
      text: '',
      // isTypeLoaded: false,
      // isTextLoaded: false,
    };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  shouldComponentUpdate(
    nextProps: Readonly<GetData>,
    nextState: Readonly<HeaderState>
  ): boolean {
    const { type, text } = this.state;
    const { getData } = this.props;
    if (nextState.type !== type || nextState.text !== text) {
      return true;
    }
    if (nextProps.getData === getData) {
      return false;
    }
    return true;
  }

  componentDidUpdate(): void {
    const { getData } = this.props;
    const { type, text } = this.state;
    getData(type, text);
  }

  onTypeChange(type: string) {
    this.setState({ type });
    // this.setState({ isTypeLoaded: true });
    // if (isChanged) {
    //   console.log('clear');
    //   // localStorage.removeItem('search');
    //   this.setState({ text: '' });
    // }
  }

  onTextChange(text: string) {
    this.setState({ text });
    // this.setState({ isTextLoaded: true });
  }

  render(): ReactNode {
    const { type, text } = this.state;
    return (
      <header className="header">
        <a
          className="header-link"
          href="https://swapi.dev/"
          target="_blank"
          rel="noreferrer"
        >
          STAR WARS API
        </a>
        <ResourceSelector onTypeChange={this.onTypeChange} curType={type} />
        <InputBlock onTextChange={this.onTextChange} curText={text} />
      </header>
    );
  }
}

export default Header;
