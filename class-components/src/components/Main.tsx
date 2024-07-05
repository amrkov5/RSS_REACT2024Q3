import { Component, ReactNode } from 'react';
import { APIResponse, MainProps } from '../types';
import Card from './Card';
import Loader from './Loader';
import NotFoundBlock from './NotFoundBlock';

class Main extends Component<MainProps, { dataToPaint: APIResponse | null }> {
  isNothingFound(): boolean {
    const { dataToPaint } = this.props;
    return Boolean(dataToPaint?.count);
  }

  render(): ReactNode {
    const { dataToPaint } = this.props;
    return (
      <main className="main">
        {!dataToPaint && <Loader />}
        {!this.isNothingFound() && dataToPaint && <NotFoundBlock />}
        {dataToPaint &&
          this.isNothingFound() &&
          dataToPaint.results.map((el) => (
            <Card data={el} key={Date.parse(String(new Date()))} />
          ))}
      </main>
    );
  }
}

export default Main;
