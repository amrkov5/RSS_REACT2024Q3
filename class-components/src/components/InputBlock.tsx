import { Component, ReactNode } from 'react';
import { InputBlockProps } from '../types';

class InputBlock extends Component<InputBlockProps, { text: string }> {
  constructor(props: InputBlockProps) {
    super(props);
    const { curText } = this.props;
    this.state = {
      text: curText,
    };
  }

  componentDidMount(): void {
    const { onTextChange } = this.props;
    const textFromLS: string | null = localStorage.getItem('search');
    if (textFromLS) {
      onTextChange(textFromLS);
      this.setState({ text: textFromLS });
    }
  }

  saveTextToLS(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { onTextChange } = this.props;
    const { text } = this.state;
    localStorage.setItem('search', text);
    onTextChange(text);
  }

  render(): ReactNode {
    const { text } = this.state;
    return (
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.saveTextToLS(e)}
      >
        <input
          className="search-input"
          type="text"
          value={text}
          onChange={(e) => this.setState({ text: e.target.value })}
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>
    );
  }
}

export default InputBlock;
