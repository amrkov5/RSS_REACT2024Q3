import { ReactNode, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Data, FieldsToShow } from '../types';
import FIELDS_TO_SHOW from '../constants';
import { selectType, updateSingleId } from '../slices/headerSlice';
import {
  addItem,
  removeItem,
  selectItemsArr,
} from '../slices/selectedItemsSlice';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function Card({ data }: { data: Data }): ReactNode {
  const selectedItems = useSelector(selectItemsArr);
  const isChecked = !!selectedItems.find((el) => el.id === data.id);
  const dispatch = useDispatch();
  const resource = useSelector(selectType) as keyof FieldsToShow;
  const field: string[] = FIELDS_TO_SHOW[resource];
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    url: string
  ) => {
    if (
      (inputRef.current && !inputRef.current.contains(e.target as Node)) ||
      (labelRef.current && !labelRef.current.contains(e.target as Node))
    ) {
      dispatch(updateSingleId({ singleId: url.match(/\d+/g) }));
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
    >
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
      <label
        className="card-selector"
        htmlFor={`selector-${data.id}`}
        ref={labelRef}
      >
        Select card:
        <input
          type="checkbox"
          id={`selector-${data.id}`}
          checked={isChecked}
          onChange={onChange}
          ref={inputRef}
        />
      </label>
    </div>
  );
}

export default Card;
