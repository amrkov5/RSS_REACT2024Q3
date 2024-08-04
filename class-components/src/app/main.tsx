'use client';

import { ReactNode, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { APIResponse, Data } from '../types';
import Card from '../components/Card';
import { ThemeContext } from '../components/ThemeContext';
import ButtonsBlock from '../components/ButtonsBlock';
import NotFoundBlock from '../components/NotFoundBlock';
import SingleCard from '../components/SingleCard';
import FLyout from '../components/FlyoutComponent';
import { selectItemsArr } from '../slices/selectedItemsSlice';
import { selectFetchError } from '../slices/errorSlice';
import {
  selectIsLoading,
  selectShallShowLoader,
  selectSingleId,
  updateIsLoading,
} from '../slices/headerSlice';
import Loader from '../components/Loader';
import { useSearchParams } from 'next/navigation';
import useDataFromLS from '../hooks/useDataFromLS';

export default function Main(): ReactNode {
  const selectedArr = useSelector(selectItemsArr);
  const fetchError = useSelector(selectFetchError);
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useContext(ThemeContext);
  const [type] = useDataFromLS('type');
  const [search] = useDataFromLS('search');
  const [singleCardDetails, setSingleCardDetails] = useState(null);
  const shallShowLoader = useSelector(selectShallShowLoader);
  const isLoading = useSelector(selectIsLoading);
  const singleId = useSelector(selectSingleId);

  // async function fetchData() {
  //   const searchParams = useSearchParams();
  //   const type = searchParams?.get('type');
  //   const search = searchParams?.get('search');
  //   const page = searchParams?.get('page');
  //   const linkToFetch = `https://swapi.dev/api/${type || 'people'}/?search=${search || ''}${Number(page) > 1 ? `&page=${page}` : ''}`;
  //   const res = await fetch(linkToFetch);
  //   const results = await res.json();
  //   results.resource = type || 'people';
  //   const info = await results;
  //   if (!info.detail) {
  //     info.results.forEach((el: Data) => {
  //       const elWithid = el;
  //       elWithid.id = String(Date.parse(el.created));
  //       return elWithid;
  //     });
  //   }

  //   return info;
  // }

  function createRouterQuery() {
    const query: {
      type: string | string[];
      search?: string | string[];
      page?: string | string[];
    } = {
      type,
    };

    if (search) {
      query.search = search;
    }
    if (info.next || info.previous) {
      query.page = searchParams?.get('page') || '1';
    }
    return query;
  }

  useEffect(() => {
    const handleRouteChangeStart = () => {
      if (shallShowLoader) {
        dispatch(updateIsLoading(true));
      }
    };
    const handleRouteChangeComplete = () => {
      dispatch(updateIsLoading(false));
    };
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [isLoading, shallShowLoader]);

  useEffect(() => {
    const { type } = router.query;
    setSingleCardDetails(null);
    if (singleId) {
      const fetchDetailedCard = async () => {
        const res = await fetch(
          `http://localhost:3000/api/getSingleCard?type=${type}&id=${singleId}`
        );
        const cardData = await res.json();
        if (res.ok) {
          setSingleCardDetails(cardData);
        }
      };

      fetchDetailedCard();
    }
  }, [router, singleId]);

  useEffect(() => {
    if (!isRedirectReady && info) {
      // router.push({ query: createRouterQuery() }, undefined, { shallow: true });
      setIsRedirectReady(true);
    }
  }, []);

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
    <main className="main" data-testid="main" data-theme={theme?.theme}>
      {(info.next || info.previous) && <ButtonsBlock next={info.next!} />}
      {(info.detail || info.results.length === 0) && !isLoading && (
        <NotFoundBlock />
      )}
      {isLoading && <Loader />}
      <div className="cards-outlet-wrapper">
        <div className="cards-wrapper">{!isLoading && content}</div>
        {!!singleId && <SingleCard singleCard={singleCardDetails} />}
      </div>
      {!!selectedArr.length && <FLyout />}
    </main>
  );
}
