'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { Data, FieldsToShow } from '../types';
import FIELDS_TO_SHOW from '../constants';
import { updateSingleId } from '../slices/headerSlice';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function SingleCard({ singleCard }: { singleCard: Data }): ReactNode {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathParams = usePathname();

  const field: string[] =
    FIELDS_TO_SHOW[pathParams.split('/')[1] as keyof FieldsToShow];

  const closeSingleCard = () => {
    dispatch(updateSingleId({ singleId: null }));
    router.back();
  };

  const content = (
    <>
      <h3 className="card-heading">
        <span className="title-name">{`${prepareFiled(field[0])}: `}</span>
        {`${singleCard[field[0] as keyof Data]}`}
      </h3>
      <p>
        <span className="title-name">{`${prepareFiled(field[1])}: `}</span>
        {`${singleCard[field[1] as keyof Data]}`}
      </p>
      <p>
        <span className="title-name">{`${prepareFiled(field[2])}: `}</span>
        {`${singleCard[field[2] as keyof Data]}`}
      </p>
      <p>
        <span className="title-name">{`${prepareFiled(field[3])}: `}</span>
        {`${singleCard[field[3] as keyof Data]}`}
      </p>
      {field[4] && (
        <p>
          <span className="title-name">{`${prepareFiled(field[4])}: `}</span>
          {`${singleCard[field[4] as keyof Data]}`}
        </p>
      )}
      {field[5] && (
        <p>
          <span className="title-name">{`${prepareFiled(field[5])}: `}</span>
          {`${singleCard[field[5] as keyof Data]}`}
        </p>
      )}
      {field[6] && (
        <p>
          <span className="title-name">{`${prepareFiled(field[6])}: `}</span>
          {`${singleCard[field[6] as keyof Data]}`}
        </p>
      )}
      {field[7] && (
        <p>
          <span className="title-name">{`${prepareFiled(field[7])}: `}</span>
          {`${singleCard[field[7] as keyof Data]}`}
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

  return (
    <div className="single-card" data-testid="outlet">
      <div
        className="single-card-background"
        onClick={closeSingleCard}
        data-testid="detailed-card"
      />
      {content}
    </div>
  );
}

export default SingleCard;
