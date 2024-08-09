'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import Card from './Card';
import ButtonsBlock from './ButtonsBlock';
import NotFoundBlock from './NotFoundBlock';
import FLyout from './FlyoutComponent';
import { selectItemsArr } from '../slices/selectedItemsSlice';
import { selectFetchError } from '../slices/errorSlice';
import { APIResponse, Data } from '../types';

export default function Main({ info }: { info: APIResponse }): ReactNode {
  const selectedArr = useSelector(selectItemsArr);
  const fetchError = useSelector(selectFetchError);

  let content;
  if (info && !info.detail) {
    content = info.results.map((el: Data) => (
      <Card data={el} key={Date.parse(el.created)} resource={info.resource} />
    ));
  }
  if (fetchError) {
    throw new Error('Fetch Error');
  }

  return (
    <div className="cards-btns-wrapper">
      {(info.next || info.previous) && <ButtonsBlock next={info.next!} />}
      {(info.detail || info.results.length === 0) && <NotFoundBlock />}
      <div className="cards-wrapper">{content}</div>
      {!!selectedArr.length && <FLyout />}
    </div>
  );
}
