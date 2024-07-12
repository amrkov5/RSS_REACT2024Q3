import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APIResponse, MainProps } from '../types';
import Card from './Card';
import Loader from './Loader';
import NotFoundBlock from './NotFoundBlock';
import { FIELDS_TO_SHOW } from '../constants';
import ButtonsBlock from './ButtonsBlock';

function isNothingFound(dataToPaint: APIResponse | null): boolean {
  return Boolean(dataToPaint?.count);
}

function Main({
  dataToPaint,
  fetchError,
  setLink,
  setPage,
  page,
}: MainProps): ReactNode {
  const { resourceType } = useParams();
  const navigate = useNavigate();

  if (fetchError) {
    throw new Error('Fetch Error');
  }

  useEffect(() => {
    if (
      resourceType &&
      !Object.keys(FIELDS_TO_SHOW).find((el) => el === resourceType)
    ) {
      navigate('/RSS_REACT2024Q3/not-found', { replace: true });
    }
  }, [resourceType]);

  return (
    <main className="main">
      <div className="cards-wrapper">
        {!dataToPaint && <Loader />}
        {!isNothingFound(dataToPaint) && dataToPaint && <NotFoundBlock />}
        {dataToPaint &&
          isNothingFound(dataToPaint) &&
          dataToPaint.results.map((el) => (
            <Card
              resource={dataToPaint.resource}
              data={el}
              key={Date.parse(el.edited)}
            />
          ))}
      </div>
      {(dataToPaint?.next || dataToPaint?.previous) && (
        <ButtonsBlock
          prev={dataToPaint.previous!}
          next={dataToPaint.next!}
          setLink={setLink}
          setPage={setPage}
          page={page}
        />
      )}
    </main>
  );
}

export default Main;
