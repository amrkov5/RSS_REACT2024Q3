import { Component, ReactNode } from 'react';

class Header extends Component {
  render(): ReactNode {
    return (
      <header>
        <a href='https://swapi.dev/'>STAR WARS API</a>
      </header>
    );
  }
}

export default Header;
