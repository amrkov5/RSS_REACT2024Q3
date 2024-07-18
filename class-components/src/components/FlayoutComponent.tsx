import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { selectItemsArr } from '../slices/selectedItemsSlice';

function FLayout(): ReactNode {
  const selectedArr = useSelector(selectItemsArr);

  return (
    <div>
      <p>
        You have selected {selectedArr.length} card
        {selectedArr.length > 1 ? 's' : ''}
      </p>
      <button type="button">Download</button>
    </div>
  );
}

export default FLayout;
