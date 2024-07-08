import { Component, ReactNode } from 'react';
import { HeaderProps, HeaderState } from '../types';
import ResourceSelector from './ResourceSelector';
import InputBlock from './InputBlock';

class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      type: null,
      text: null,
    };
    this.onTypeChange = this.onTypeChange.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  shouldComponentUpdate(
    nextProps: Readonly<HeaderProps>,
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
    if (type && text) {
      getData(type, text);
    }
  }

  onTypeChange(type: string) {
    const { updateType } = this.props;
    this.setState({ type }, () => updateType(type));
  }

  onTextChange(text: string) {
    const { updateText } = this.props;
    this.setState({ text }, () => updateText(text));
  }

  render(): ReactNode {
    const { throwFetchError, wholeAppError } = this.props;
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
        <div className="err-wrapper">
          <button className="err-btn" onClick={throwFetchError} type="button">
            Fetch Error
          </button>
          <button className="err-btn" onClick={wholeAppError} type="button">
            App Error
          </button>
        </div>
        <div className="search-wrapper">
          <ResourceSelector onChange={this.onTypeChange} />
          <InputBlock onChange={this.onTextChange} />
        </div>
      </header>
    );
  }
}

export default Header;
