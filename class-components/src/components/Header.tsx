import { Component, ReactNode } from 'react';
import InputBlock from './InputBlock';

class Header extends Component {
  render(): ReactNode {
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
        <InputBlock />
      </header>
    );
  }
}

export default Header;
