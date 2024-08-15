import { useDispatch, useSelector } from 'react-redux';
import styles from './forms.module.css';
import { selectCountry } from '../../slice/countrySlice';
import { FormEvent, useRef, useState } from 'react';
import schema from '../../services/validation';
import { addData, FormData } from '../../slice/formSlice';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';
import encodeImageFileAsURL from '../../services/uploadFile';

export default function UncontrolledForm() {
  const [formErrors, setFormErrors] = useState<Record<string, string>>();
  const countries = useSelector(selectCountry);
  const countryData = useRef('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpload = async (file: File) => {
    const data = (await encodeImageFileAsURL(file)) as string;
    return data;
  };

  const onSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      nameInput: { value: string };
      ageInput: { value: string };
      emailInput: { value: string };
      pwdInput: { value: string };
      repeatPwdInput: { value: string };
      genderM: { value: string; checked: boolean };
      genderF: { value: string; checked: boolean };
      countrySelector: { value: string };
      picUpload: { files: File[] | [] };
      conditions: { checked: boolean };
    };
    const gender =
      (target.genderF.checked && 'female') ||
      (target.genderM.checked && 'male');
    const formData: FormData = {
      name: target.nameInput.value,
      age: target.ageInput.value,
      email: target.emailInput.value,
      password: target.pwdInput.value,
      rPassword: target.repeatPwdInput.value,
      gender: gender ? gender : '',
      country: target.countrySelector.value,
      conditionsChecked: target.conditions.checked,
      picData: target.picUpload.files[0],
      isNew: true,
    };
    await schema
      .validate(formData, { abortEarly: false })
      .then(async () => {
        const encFile = await handleUpload(formData.picData as File);
        dispatch(addData({ ...formData, picData: encFile }));
        navigate('/');
      })
      .catch((error) => {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: ValidationError) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setFormErrors(validationErrors);
      });
  };

  return (
    <>
      <h3 className={styles.uncontrolledForm}>Uncontrolled Form</h3>
      <form onSubmit={(event) => onSubmitForm(event)} className={styles.form}>
        <label htmlFor="nameInput" className={styles.label}>
          Name:
          <input
            id="nameInput"
            name="nameInput"
            placeholder="Enter your name"
          />
          {formErrors?.name && (
            <span className={styles.errMsg}>{formErrors.name}</span>
          )}
        </label>
        <label htmlFor="ageInput" className={styles.label}>
          Age:
          <input id="ageInput" placeholder="Enter your age" name="ageInput" />
          {formErrors?.age && (
            <span className={styles.errMsg}>{formErrors.age}</span>
          )}
        </label>
        <label htmlFor="emailInput" className={styles.label}>
          E-mail:
          <input
            id="emailInput"
            name="emailInput"
            placeholder="Enter your email"
          />
          {formErrors?.email && (
            <span className={styles.errMsg}>{formErrors.email}</span>
          )}
        </label>
        <label htmlFor="pwdInput" className={styles.label}>
          Password:
          <input
            type="password"
            id="pwdInput"
            name="pwdInput"
            placeholder="Enter your password"
          />
          {formErrors?.password && (
            <span className={styles.errMsg}>{formErrors.password}</span>
          )}
        </label>
        <label htmlFor="repeatPwdInput" className={styles.label}>
          Repeat password:
          <input
            type="password"
            id="repeatPwdInput"
            name="repeatPwdInput"
            placeholder="Confirm the password"
          />
          {formErrors?.rPassword && (
            <span className={styles.errMsg}>{formErrors.rPassword}</span>
          )}
        </label>
        <div className={styles.label}>
          Choose your gender:
          <div className={styles.genderWrapper}>
            <label htmlFor="male">
              Male:
              <input type="radio" name="genderM" id="male" value="male" />
            </label>
            <label htmlFor="female">
              Female:
              <input type="radio" name="genderF" value="female" id="female" />
            </label>
          </div>
          {formErrors?.gender && (
            <span className={styles.errMsg}>{formErrors.gender}</span>
          )}
        </div>

        <label htmlFor="countrySelector" className={styles.label}>
          <input
            id="countrySelector"
            name="countrySelector"
            list="countryList"
            placeholder="Select a country"
          />
          <datalist id="countryList">
            {countries
              .filter((el: string) =>
                el.toLowerCase().startsWith(countryData.current)
              )
              .map((el: string) => (
                <option value={el} key={el} />
              ))}
          </datalist>
          {formErrors?.country && (
            <span className={styles.errMsg}>{formErrors.country}</span>
          )}
        </label>
        <label htmlFor="picUpload" className={styles.label}>
          Upload your picture:
          <input
            type="file"
            name="picUpload"
            id="picUpload"
            className={styles.fileInput}
          />
          {formErrors?.picData && (
            <span className={styles.errMsg}>{formErrors.picData}</span>
          )}
        </label>
        <label htmlFor="tAndC" className={styles.tcLabel}>
          <input type="checkbox" name="conditions" id="tAndC" />I agree with T&C
          {formErrors?.conditionsChecked && (
            <span className={styles.errMsg}>
              {formErrors.conditionsChecked}
            </span>
          )}
        </label>
        <button className={styles.submitBtn}>Submit form</button>
      </form>
    </>
  );
}
