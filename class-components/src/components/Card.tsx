import { ReactNode } from 'react';
import { APIResults, Data } from '../types';
import { FIELDS_TO_SHOW } from '../constants';

function prepareFiled(field: string) {
  const formattedField = field.replace('_', ' ');
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

function Card({ resource, data, onClick }: APIResults): ReactNode {
  const field: string[] = FIELDS_TO_SHOW[resource];

  const handleClick = (dataToSingleCard: Data) => {
    const linkName = prepareFiled(dataToSingleCard[field[0] as keyof Data]);
    if (onClick) {
      onClick(dataToSingleCard.url, linkName);
    }
  };

  return (
    <div onClick={() => handleClick(data)} className="card" data-testid="card">
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
    </div>
  );
}

export default Card;
