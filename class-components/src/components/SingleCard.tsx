import { ReactNode, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Data, FieldsToShow } from '../types';
import Loader from './Loader';
import FIELDS_TO_SHOW from '../constants';
import { updateSingleId } from '../slices/headerSlice';
import { useGetSingleCardQuery } from '../slices/apiSlice';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function SingleCard(): ReactNode {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const singleId = useSelector((state: RootState) => state.header.singleId);
  // const resourceType = useSelector((state: RootState) => state.header.type);
  // const [loadedData, setLoadedData] = useState<Data | null>(null);
  const { resourceType, id } = useParams();
  const field: string[] | 'people' = resourceType
    ? FIELDS_TO_SHOW[resourceType as keyof FieldsToShow]
    : FIELDS_TO_SHOW.people;

  const closeSingleCard = () => {
    dispatch(updateSingleId({ singleId: null }));
    navigate(-1);
  };

  useEffect(() => {
    window.addEventListener('popstate', () => {
      dispatch(updateSingleId({ singleId: null }));
    });

    return window.removeEventListener('popstate', () => {
      dispatch(updateSingleId({ singleId: null }));
    });
  });

  const { data, isLoading, isFetching, isSuccess } = useGetSingleCardQuery({
    resourceType,
    id,
  });
  let content;
  if (isLoading || isFetching) {
    content = <Loader />;
  }
  if (isSuccess) {
    content = (
      <>
        <div
          className="single-card-background"
          onClick={closeSingleCard}
          data-testid="detailed-card"
        />

        <h3 className="card-heading">
          <span className="title-name">{`${prepareFiled(field[0])}: `}</span>
          {`${data[field[0] as keyof Data]}`}
        </h3>
        <p>
          <span className="title-name">{`${prepareFiled(field[1])}: `}</span>
          {`${data[field[1] as keyof Data]}`}
        </p>
        <p>
          <span className="title-name">{`${prepareFiled(field[2])}: `}</span>
          {`${data[field[2] as keyof Data]}`}
        </p>
        <p>
          <span className="title-name">{`${prepareFiled(field[3])}: `}</span>
          {`${data[field[3] as keyof Data]}`}
        </p>
        {field[4] && (
          <p>
            <span className="title-name">{`${prepareFiled(field[4])}: `}</span>
            {`${data[field[4] as keyof Data]}`}
          </p>
        )}
        {field[5] && (
          <p>
            <span className="title-name">{`${prepareFiled(field[5])}: `}</span>
            {`${data[field[5] as keyof Data]}`}
          </p>
        )}
        {field[6] && (
          <p>
            <span className="title-name">{`${prepareFiled(field[6])}: `}</span>
            {`${data[field[6] as keyof Data]}`}
          </p>
        )}
        {field[7] && (
          <p>
            <span className="title-name">{`${prepareFiled(field[7])}: `}</span>
            {`${data[field[7] as keyof Data]}`}
          </p>
        )}
        <button
          className="single-card-btn"
          type="button"
          onClick={closeSingleCard}
        >
          Close
        </button>
      </>
    );
  }

  return (
    <div className="single-card" data-testid="outlet">
      {content}
    </div>
  );
}
export default SingleCard;
