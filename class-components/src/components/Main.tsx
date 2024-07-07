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
    const { dataToPaint, fetchError } = this.props;
    if (fetchError) {
      throw new Error('Fetch Error');
    }
    return (
      <main className="main">
        <div className="cards-wrapper">
          {!dataToPaint && <Loader />}
          {!this.isNothingFound() && dataToPaint && <NotFoundBlock />}
          {dataToPaint &&
            this.isNothingFound() &&
            dataToPaint.results.map((el) => (
              <Card
                resource={dataToPaint.resource}
                data={el}
                key={Date.parse(el.edited)}
              />
            ))}
        </div>
      </main>
    );
  }
}

export default Main;
