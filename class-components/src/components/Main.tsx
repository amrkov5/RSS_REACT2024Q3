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
import FLayout from './FlayoutComponent';

function Main(): ReactNode {
  const type = useSelector(selectType);
  const text = useSelector(selectText);
  const page = useSelector(selectPageNum);
  const selectedArr = useSelector(selectItemsArr);

  const [trigger, { data, isLoading, isFetching, isSuccess, isError }] =
    useLazyGetItemsQuery();

  useEffect(() => {
    trigger({
      resourceType: type,
      query: text,
      page,
    });
  }, [type, text, page, trigger]);

  // const {
  //   data: data,
  //   isLoading,
  //   isFetching,
  //   isSuccess,
  //   isError,
  // } = useGetItemsQuery({
  //   resourceType,
  //   query: URLSearchParams.get('search'),
  //   page: URLSearchParams.get('page'),
  // });

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

  // const navigate = useNavigate();
  // const [singleLink, setSingleLink] = useState({ link: '', name: '' });

  // const showCard = (link: string, name: string) => {
  //   setSingleLink({ link, name });
  // };

  // useEffect(() => {
  //   if (singleLink.link) {
  //     navigate(`/RSS_REACT2024Q3/${resourceType}/card/${singleLink.name}`);
  //   }
  // }, [singleLink]);

  // useEffect(() => {
  //   if (
  //     resourceType &&
  //     !Object.keys(FIELDS_TO_SHOW).find((el) => el === resourceType)
  //   ) {
  //     navigate('/RSS_REACT2024Q3/not-found', { replace: true });
  //   }
  // }, [resourceType]);

  // if (fetchError) {
  //   throw new Error('Fetch Error');
  // }

  return (
    <main className="main" data-testid="main">
      {areButtonsNeeded && isSuccess && <ButtonsBlock next={data.next!} />}
      <div className="cards-outlet-wrapper">
        <div className="cards-wrapper">{content}</div>
        <Outlet />
      </div>
      {selectedArr.length && <FLayout />}
    </main>
  );
}

export default Main;
