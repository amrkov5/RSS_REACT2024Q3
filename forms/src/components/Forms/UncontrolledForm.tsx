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
  // const formRef = useRef();
  // const nameData = useRef('');
  // const ageData = useRef<number>();
  // const emailData = useRef('');
  // const rPwdData = useRef('');
  // const pwdData = useRef('');
  // const genderData = useRef('');
  // const TandCData = useRef(false);
  const countryData = useRef('');
  // const picData = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const createFormObject = () => {
  //   const formData: FormData = {
  //     name: nameData.current,
  //     age: ageData.current!,
  //     email: emailData.current,
  //     password: pwdData.current,
  //     rPassword: rPwdData.current,
  //     gender: genderData.current,
  //     country: countryData.current,
  //     conditionsChecked: TandCData.current,
  //     picData: picData.current ? picData.current.files[0] : null,
  //     isNew: true,
  //   };
  //   return formData;
  // };

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
      age: Number(target.ageInput.value),
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
        <label htmlFor="nameInput">
          Name:
          <input
            id="nameInput"
            name="nameInput"
            placeholder="Enter your name"
          />
          {formErrors?.name && <span>{formErrors.name}</span>}
        </label>
        <label htmlFor="ageInput">
          Age:
          <input id="ageInput" placeholder="Enter your age" name="ageInput" />
          {formErrors?.age && <span>{formErrors.age}</span>}
        </label>
        <label htmlFor="emailInput">
          E-mail:
          <input
            id="emailInput"
            name="emailInput"
            placeholder="Enter your email"
          />
          {formErrors?.email && <span>{formErrors.email}</span>}
        </label>
        <label htmlFor="pwdInput">
          Password:
          <input
            type="password"
            id="pwdInput"
            name="pwdInput"
            placeholder="Enter your password"
          />
          {formErrors?.password && <span>{formErrors.password}</span>}
        </label>
        <label htmlFor="repeatPwdInput">
          Repeat password:
          <input
            type="password"
            id="repeatPwdInput"
            name="repeatPwdInput"
            placeholder="Enter your password"
          />
          {formErrors?.rPassword && <span>{formErrors.rPassword}</span>}
        </label>
        <div>
          Choose your gender:
          <label htmlFor="male">
            Male:
            <input type="radio" name="genderM" id="male" value="male" />
          </label>
          <label htmlFor="female">
            Female:
            <input type="radio" name="genderF" value="female" id="female" />
          </label>
          {formErrors?.gender && <span>{formErrors.gender}</span>}
        </div>

        <label htmlFor="countrySelector">
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
          {formErrors?.country && <span>{formErrors.country}</span>}
        </label>
        <label htmlFor="picUpload">
          Upload your picture:
          <input type="file" name="picUpload" id="picUpload" />
          {formErrors?.picData && <span>{formErrors.picData}</span>}
        </label>
        <label htmlFor="tAndC">
          <input type="checkbox" name="conditions" id="tAndC" />I agree with T&C
          {formErrors?.conditionsChecked && (
            <span>{formErrors.conditionsChecked}</span>
          )}
        </label>
        <button>Submit form</button>
      </form>
    </>
  );
}
