import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './forms.module.css';
import schema from '../../services/validation';
import { useDispatch, useSelector } from 'react-redux';
import { selectCountry } from '../../slice/countrySlice';
import { useState } from 'react';
import { addData, FormData } from '../../slice/formSlice';
import { useNavigate } from 'react-router-dom';
import handleUpload from '../../services/uploadFile';

export default function ControlledForm() {
  const countries = useSelector(selectCountry);
  const [countryInput] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmitHandler = async (data: FormData) => {
    const encFile = await handleUpload(data.picData as FileList);
    dispatch(addData({ ...data, picData: encFile, isNew: true }));
    navigate('/');
    reset();
  };

  return (
    <>
      <h3 className={styles.uncontrolledForm}>Controlled Form</h3>
      <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
        <label htmlFor="nameInput" className={styles.label}>
          Name:
          <input
            id="nameInput"
            placeholder="Enter your name"
            {...register('name')}
          />
          {errors.name?.message && (
            <span className={styles.errMsg}>{errors.name.message}</span>
          )}
        </label>
        <label htmlFor="ageInput" className={styles.label}>
          Age:
          <input
            id="ageInput"
            placeholder="Enter your age"
            {...register('age')}
          />
          {errors.age?.message && (
            <span className={styles.errMsg}>{errors.age.message}</span>
          )}
        </label>
        <label htmlFor="emailInput" className={styles.label}>
          E-mail:
          <input
            id="emailInput"
            placeholder="Enter your email"
            {...register('email')}
          />
          {errors.email?.message && (
            <span className={styles.errMsg}>{errors.email.message}</span>
          )}
        </label>
        <label htmlFor="pwdInput" className={styles.label}>
          Password:
          <input
            type="password"
            id="pwdInput"
            placeholder="Enter your password"
            {...register('password')}
          />
          {errors.password?.message && (
            <span className={styles.errMsg}>{errors.password.message}</span>
          )}
        </label>
        <label htmlFor="repeatPwdInput" className={styles.label}>
          Repeat password:
          <input
            type="password"
            id="repeatPwdInput"
            placeholder="Confirm the password"
            {...register('rPassword')}
          />
          {errors.rPassword?.message && (
            <span className={styles.errMsg}>{errors.rPassword.message}</span>
          )}
        </label>
        <div className={styles.label}>
          Choose your gender:
          <div className={styles.genderWrapper}>
            <label htmlFor="male">
              Male:
              <input
                type="radio"
                id="male"
                value="male"
                {...register('gender')}
              />
            </label>
            <label htmlFor="female">
              Female:
              <input
                type="radio"
                value="female"
                id="female"
                {...register('gender')}
              />
            </label>
          </div>
          {errors.gender?.message && (
            <span className={styles.errMsg}>{errors.gender.message}</span>
          )}
        </div>

        <label htmlFor="countrySelector" className={styles.label}>
          <input
            id="countrySelector"
            list="countryList"
            placeholder="Select a country"
            {...register('country')}
          />
          <datalist id="countryList">
            {countries
              .filter((el: string) => el.toLowerCase().startsWith(countryInput))
              .map((el: string) => (
                <option value={el} key={el} />
              ))}
          </datalist>
          {errors.country?.message && (
            <span className={styles.errMsg}>{errors.country.message}</span>
          )}
        </label>
        <label htmlFor="picUpload" className={styles.label}>
          Upload your picture:
          <input
            type="file"
            id="picUpload"
            className={styles.fileInput}
            {...register('picData')}
          />
          {errors.picData?.message && (
            <span className={styles.errMsg}>{errors.picData.message}</span>
          )}
        </label>
        <label htmlFor="tAndC" className={styles.tcLabel}>
          <input
            type="checkbox"
            id="tAndC"
            {...register('conditionsChecked')}
          />
          I agree with T&C
          {errors.conditionsChecked?.message && (
            <span className={styles.errMsg}>
              {errors.conditionsChecked.message}
            </span>
          )}
        </label>
        <button type="submit" className={styles.submitBtn} disabled={!isValid}>
          Submit form
        </button>
      </form>
    </>
  );
}
