import { ReactNode, useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { APIResponse, MainProps } from '../types';
import Card from './Card';
import Loader from './Loader';
import NotFoundBlock from './NotFoundBlock';
import { FIELDS_TO_SHOW } from '../constants';
import ButtonsBlock from './ButtonsBlock';

function isNothingFound(dataToPaint: APIResponse | null): boolean {
  return Boolean(dataToPaint?.count);
}

// const OutletContext = createContext(undefined);

function Main({
  dataToPaint,
  fetchError,
  setLink,
  setPage,
  page,
}: MainProps): ReactNode {
  const { resourceType } = useParams();
  const navigate = useNavigate();
  const [singleLink, setSingleLink] = useState({ link: '', name: '' });
  const showCard = (link: string, name: string) => {
    setSingleLink({ link, name });
  };

  useEffect(() => {
    navigate(`/RSS_REACT2024Q3/${resourceType}/card/${singleLink.name}`);
  }, [singleLink]);

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
      {(dataToPaint?.next || dataToPaint?.previous) && (
        <ButtonsBlock
          prev={dataToPaint.previous!}
          next={dataToPaint.next!}
          setLink={setLink}
          setPage={setPage}
          page={page}
        />
      )}
      <div className="cards-outlet-wrapper">
        {!dataToPaint && <Loader />}
        {!isNothingFound(dataToPaint) && dataToPaint && <NotFoundBlock />}
        {dataToPaint && isNothingFound(dataToPaint) && (
          <div className="cards-wrapper">
            {dataToPaint.results.map((el) => (
              <Card
                onClick={showCard}
                resource={dataToPaint.resource}
                data={el}
                key={Date.parse(el.edited)}
              />
            ))}
          </div>
        )}
        {singleLink && (
          <Outlet
            context={singleLink satisfies { link: string; name: string }}
          />
        )}
      </div>
    </main>
  );
}

export default Main;
