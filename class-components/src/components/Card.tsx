'use client';

import { ReactNode, useContext, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Data, FieldsToShow } from '../types';
import {
  addItem,
  removeItem,
  selectItemsArr,
} from '../slices/selectedItemsSlice';
import { ThemeContext } from './ThemeContext';
import FIELDS_TO_SHOW from '../constants';
import { updateShowLoader, updateSingleId } from '../slices/headerSlice';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function Card({
  data,
  resource,
}: {
  data: Data;
  resource: keyof FieldsToShow;
}): ReactNode {
  const selectedItems = useSelector(selectItemsArr);
  const isChecked = !!selectedItems.find((el) => el.id === data.id);
  const dispatch = useDispatch();
  const router = useRouter();
  const field: string[] = FIELDS_TO_SHOW[resource];
  const labelRef = useRef<HTMLLabelElement>(null);
  const theme = useContext(ThemeContext);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string
  ) => {
    const id = url.match(/\d+/g);
    if (labelRef.current && !labelRef.current.contains(e.target as Node)) {
      dispatch(updateSingleId({ singleId: id }));
      dispatch(updateShowLoader(false));
      router.push({ query: { type: router.query.type, id } }, undefined, {
        shallow: true,
      });
    }
  };

  const onChange = () => {
    if (isChecked) {
      dispatch(removeItem(data));
    } else {
      dispatch(addItem(data));
    }
  };

  return (
    <div
      onClick={(e) => handleClick(e, data.url)}
      className="card"
      data-testid="card"
      data-theme={theme?.theme}
    >
      <h3 className="card-heading">
        <span
          className="title-name"
          data-theme={theme?.theme}
        >{`${prepareFiled(field[0])}: `}</span>
        {`${data[field[0] as keyof Data]}`}
      </h3>
      <p>
        <span
          className="title-name"
          data-theme={theme?.theme}
        >{`${prepareFiled(field[1])}: `}</span>
        {`${data[field[1] as keyof Data]}`}
      </p>
      <p>
        <span
          className="title-name"
          data-theme={theme?.theme}
        >{`${prepareFiled(field[2])}: `}</span>
        {`${data[field[2] as keyof Data]}`}
      </p>
      <p>
        <span
          className="title-name"
          data-theme={theme?.theme}
        >{`${prepareFiled(field[3])}: `}</span>
        {`${data[field[3] as keyof Data]}`}
      </p>
      {field[4] && (
        <p>
          <span
            className="title-name"
            data-theme={theme?.theme}
          >{`${prepareFiled(field[4])}: `}</span>
          {`${data[field[4] as keyof Data]}`}
        </p>
      )}
      <label
        className="card-selector"
        htmlFor={`selector-${Date.parse(data.created)}`}
        ref={labelRef}
        data-theme={theme?.theme}
      >
        Select card:
        <input
          type="checkbox"
          id={`selector-${Date.parse(data.created)}`}
          checked={isChecked}
          onChange={onChange}
          data-testid="card-selector"
        />
      </label>
    </div>
  );
}

export default Card;
