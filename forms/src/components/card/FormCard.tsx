import { useEffect, useState } from 'react';
import { FormData, setAsRead } from '../../slice/formSlice';
import styles from './formData.module.css';
import { useDispatch } from 'react-redux';

export default function FormCard({ data }: { data: FormData }) {
  const [style, setStyle] = useState(`${styles.formData}`);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.isNew) {
      setStyle(`${styles.formData} ${styles.newData}`);

      setTimeout(() => {
        setStyle(`${styles.formData}`);
      }, 3000);

      dispatch(setAsRead(data.id));
    }
  }, [data.isNew, data.id, dispatch]);

  return (
    <div className={style}>
      <img src={data.picData as string} />
      <h3>Name: {data.name}</h3>
      <p>Age:{data.age}</p>
      <p>E-mail: {data.email}</p>
      <p>Gender: {data.gender}</p>
      <p>Country: {data.country}</p>
    </div>
  );
}
