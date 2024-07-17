import { useEffect } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from './Header';
import { LayoutProps } from '../types';
import useDataFromLS from '../hooks/useDataFromLS';
import {
  updatePage,
  updateSingleId,
  updateText,
  updateType,
} from '../slices/headerSlice';
import FIELDS_TO_SHOW from '../constants';

function Layout(props: LayoutProps) {
  const navigate = useNavigate();
  const { resourceType, id } = useParams();
  const [typeFromLS] = useDataFromLS('type');
  const [textFromLS] = useDataFromLS('text');
  const dispatch = useDispatch();
  const { wholeAppError, throwFetchError } = props;
  const [URLSearchParams] = useSearchParams();

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
      <Header wholeAppError={wholeAppError} throwFetchError={throwFetchError} />
      <Outlet />
    </>
  );
}

export default Layout;
