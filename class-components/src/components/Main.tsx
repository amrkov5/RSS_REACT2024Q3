import { ReactNode, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Data } from '../types';
import Card from './Card';
import Loader from './Loader';
import NotFoundBlock from './NotFoundBlock';
import ButtonsBlock from './ButtonsBlock';
import { useLazyGetItemsQuery } from '../slices/apiSlice';
import { selectPageNum, selectText, selectType } from '../slices/headerSlice';
import { selectItemsArr } from '../slices/selectedItemsSlice';
import FLyout from './FlyoutComponent';
import { selectFetchError } from '../slices/errorSlice';

function Main(): ReactNode {
  const type = useSelector(selectType);
  const text = useSelector(selectText);
  const page = useSelector(selectPageNum);
  const selectedArr = useSelector(selectItemsArr);
  const fetchError = useSelector(selectFetchError);

  const [trigger, { data, isLoading, isFetching, isSuccess, isError }] =
    useLazyGetItemsQuery();

  useEffect(() => {
    trigger({
      resourceType: type,
      query: text,
      page,
    });
  }, [type, text, page, trigger, fetchError]);

  let areButtonsNeeded = false;
  let content;
  if (isLoading || isFetching) {
    areButtonsNeeded = false;
    content = <Loader />;
  } else if (isSuccess) {
    if (data.results.length === 0) {
      content = <NotFoundBlock />;
    } else {
      if (data.next || data.previous) {
        areButtonsNeeded = true;
      }
      content = data.results.map((el: Data) => <Card data={el} key={el.id} />);
    }
  } else if (isError) {
    throw new Error('Fetch error');
  }

  if (fetchError) {
    throw new Error('Fetch Error');
  }

  return (
    <main className="main" data-testid="main">
      {areButtonsNeeded && isSuccess && <ButtonsBlock next={data.next!} />}
      <div className="cards-outlet-wrapper">
        <div className="cards-wrapper">{content}</div>
        <Outlet />
      </div>
      {!!selectedArr.length && <FLyout />}
    </main>
  );
}

export default Main;
