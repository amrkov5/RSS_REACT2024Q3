import { useSelector } from 'react-redux';
import { FormData, selectData } from '../../slice/formSlice';
import FormCard from '../card/FormCard';

export default function Main() {
  const dataArr = useSelector(selectData).data;
  return (
    <>
      {dataArr
        .slice()
        .reverse()
        .map((el: FormData) => (
          <FormCard data={el} key={el.id} />
        ))}
    </>
  );
}
