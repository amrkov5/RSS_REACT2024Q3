import { Component, ReactNode } from 'react';

class InputBlock extends Component<object, { text: string }> {
  constructor(props: object) {
    super(props);
    this.state = {
      text: '',
    };
  }

  componentDidMount(): void {
    const textFromLS: string | null = localStorage.getItem('search');
    if (textFromLS) {
      this.setState({ text: textFromLS });
    }
  }

  saveTextToLS(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const { text } = this.state;
    localStorage.setItem('search', text);
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
