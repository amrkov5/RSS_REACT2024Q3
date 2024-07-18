import { ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearList, selectItemsArr } from '../slices/selectedItemsSlice';
import downloadCSV from '../service/downloadCSV';
import { selectType } from '../slices/headerSlice';

function FLayout(): ReactNode {
  const dispatch = useDispatch();
  const selectedArr = useSelector(selectItemsArr);
  const type = useSelector(selectType);

  return (
    <div>
      <p>
        You have selected {selectedArr.length} card
        {selectedArr.length > 1 ? 's' : ''}
      </p>
      <button type="button" onClick={() => downloadCSV(selectedArr, type)}>
        Download
      </button>
      <button type="button" onClick={() => dispatch(clearList())}>
        Clear selection
      </button>
    </div>
  );
}

export default FLayout;
