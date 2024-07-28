import { ReactNode, useEffect } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Header';
import useDataFromLS from '../hooks/useDataFromLS';
import {
  updatePage,
  updateSingleId,
  updateText,
  updateType,
} from '../slices/headerSlice';
import FIELDS_TO_SHOW from '../constants';
import { selectWholeAppError } from '../slices/errorSlice';

function Layout(): ReactNode {
  const navigate = useNavigate();
  const { resourceType, id } = useParams();
  const [typeFromLS] = useDataFromLS('type');
  const [textFromLS] = useDataFromLS('text');
  const dispatch = useDispatch();
  const [URLSearchParams] = useSearchParams();
  const appError = useSelector(selectWholeAppError);

  if (appError) {
    throw new Error('Whole app error');
  }
  if (
    resourceType &&
    !Object.keys(FIELDS_TO_SHOW).find((el) => el === typeFromLS)
  ) {
    navigate('/RSS_REACT2024Q3/not-found', { replace: true });
  }

  useEffect(() => {
    dispatch(updateType({ type: typeFromLS }));
    dispatch(updateText({ text: textFromLS }));
    dispatch(updatePage({ page: Number(URLSearchParams.get('page')) || 1 }));
    dispatch(updateSingleId({ singleId: id || null }));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
