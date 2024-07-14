import { useNavigate, useParams } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import getAPIData from '../api';
import useSingleCard from '../hooks/useSingleCard';
import { Data, FieldsToShow } from '../types';
import Loader from './Loader';
import { FIELDS_TO_SHOW } from '../constants';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function SingleCard(): ReactNode {
  const { link } = useSingleCard();
  const [loadedData, setLoadedData] = useState<Data | null>(null);
  const { resourceType } = useParams();
  const field: string[] | 'people' = resourceType
    ? FIELDS_TO_SHOW[resourceType as keyof FieldsToShow]
    : FIELDS_TO_SHOW.people;
  const navigate = useNavigate();

  const getData = async (linkStr?: string): Promise<void> => {
    if (linkStr) {
      setLoadedData(null);
      const result = await getAPIData({
        type: resourceType,
        link: linkStr,
      });
      if (result) {
        setLoadedData(result as Data);
      }
    }
  };

  useEffect(() => {
    getData(link);
  }, [link]);

  return (
    <>
      <div className="single-card-background" onClick={() => navigate(-1)} />
      <div className="single-card" data-testid="outlet">
        {!loadedData && <Loader />}
        {loadedData && (
          <>
            <h3 className="card-heading">
              <span className="title-name">{`${prepareFiled(field[0])}: `}</span>
              {`${loadedData[field[0] as keyof Data]}`}
            </h3>
            <p>
              <span className="title-name">{`${prepareFiled(field[1])}: `}</span>
              {`${loadedData[field[1] as keyof Data]}`}
            </p>
            <p>
              <span className="title-name">{`${prepareFiled(field[2])}: `}</span>
              {`${loadedData[field[2] as keyof Data]}`}
            </p>
            <p>
              <span className="title-name">{`${prepareFiled(field[3])}: `}</span>
              {`${loadedData[field[3] as keyof Data]}`}
            </p>
            {field[4] && (
              <p>
                <span className="title-name">{`${prepareFiled(field[4])}: `}</span>
                {`${loadedData[field[4] as keyof Data]}`}
              </p>
            )}
            {field[5] && (
              <p>
                <span className="title-name">{`${prepareFiled(field[5])}: `}</span>
                {`${loadedData[field[5] as keyof Data]}`}
              </p>
            )}
            {field[6] && (
              <p>
                <span className="title-name">{`${prepareFiled(field[6])}: `}</span>
                {`${loadedData[field[6] as keyof Data]}`}
              </p>
            )}
            {field[7] && (
              <p>
                <span className="title-name">{`${prepareFiled(field[7])}: `}</span>
                {`${loadedData[field[7] as keyof Data]}`}
              </p>
            )}
            <button
              className="single-card-btn"
              type="button"
              onClick={() => navigate(-1)}
            >
              Close
            </button>
          </>
        )}
      </div>
    </>
  );
}
export default SingleCard;
