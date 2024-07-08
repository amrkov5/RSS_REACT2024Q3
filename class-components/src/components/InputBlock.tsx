import { ReactNode, useEffect, useState } from 'react';
import { SelectorAndInputProps } from '../types';
import useDataFromLS from '../hooks/useDataFromLS';

function InputBlock(props: SelectorAndInputProps): ReactNode {
  const { onChange } = props;
  const [textToLS, setTextToLS] = useDataFromLS('search');
  const [text, setText] = useState(textToLS);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTextToLS(text);
  };

  useEffect(() => {
    onChange(textToLS);
  }, [textToLS]);

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitForm(e)}>
      <input
        className="search-input"
        type="text"
        value={text || ''}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
}

// class InputBlock extends Component<
//   SelectorAndInputProps,
//   { text: string | null }
// > {
//   constructor(props: SelectorAndInputProps) {
//     super(props);
//     const { curValue } = this.props;
//     this.state = {
//       text: curValue,
//     };
//   }

//   componentDidMount(): void {
//     const { onChange } = this.props;
//     const textFromLS: string | null = localStorage.getItem('search');
//     if (textFromLS) {
//       onChange(textFromLS);
//       this.setState({ text: textFromLS });
//     } else {
//       onChange(' ');
//     }
//   }

//   saveTextToLS(event: React.FormEvent<HTMLFormElement>): void {
//     event.preventDefault();
//     const { onChange } = this.props;
//     const { text } = this.state;
//     if (text) {
//       localStorage.setItem('search', text.trim());
//       onChange(text);
//     } else {
//       localStorage.removeItem('search');
//       onChange(' ');
//     }
//   }

//   render(): ReactNode {
//     const { text } = this.state;
//     return (
//       <form
//         onSubmit={(e: React.FormEvent<HTMLFormElement>) => this.saveTextToLS(e)}
//       >
//         <input
//           className="search-input"
//           type="text"
//           value={text || ''}
//           onChange={(e) => this.setState({ text: e.target.value })}
//         />
//         <button type="submit" className="search-btn">
//           Search
//         </button>
//       </form>
//     );
//   }
// }

export default InputBlock;
