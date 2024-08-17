import styles from '../components/Forms/forms.module.css';

const passStrengthValidation = (data: string) => {
  let strength = 0;

  if (/[A-Z]/.test(data)) {
    strength += 1;
  }
  if (/[a-z]/.test(data)) {
    strength += 1;
  }
  if (/[0-9]/.test(data)) {
    strength += 1;
  }
  if (/[!@#$%^&*()_+[\]{}><?/.,|]/.test(data)) {
    strength += 1;
  }
  if (data.length < 8 && data.length > 0 && strength > 1) {
    strength -= 1;
  } else if (data.length >= 8) {
    strength += 1;
  }

  return strength;
};

const showStrength = (passStrength: number) => {
  if (passStrength < 3) {
    return 'Weak';
  }
  if (passStrength < 5) {
    return 'Normal';
  }
  return 'Strong';
};

const addStrengthStyle = (passStrength: number) => {
  if (passStrength < 3) {
    return `${styles.weak}`;
  }
  if (passStrength < 5) {
    return `${styles.normal}`;
  }
  return `${styles.strong}`;
};

export { passStrengthValidation, showStrength, addStrengthStyle };
