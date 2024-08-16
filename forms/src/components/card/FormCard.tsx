import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { FormData, setAsRead } from '../../slice/formSlice';
import styles from './formData.module.css';

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
      <img src={data.picData as string} className={styles.formImage} />
      <h3>
        <span className={styles.headings}>Name:</span> {data.name}
      </h3>
      <p className={styles.text}>
        <span className={styles.headings}>Age:</span> {data.age}
      </p>
      <p className={styles.text}>
        <span className={styles.headings}>E-mail:</span> {data.email}
      </p>
      <p className={styles.text}>
        <span className={styles.headings}>Password:</span> {data.password}
      </p>
      <p className={styles.text}>
        <span className={styles.headings}>Gender:</span> {data.gender}
      </p>
      <p className={styles.text}>
        <span className={styles.headings}>Country:</span> {data.country}
      </p>
    </div>
  );
}
