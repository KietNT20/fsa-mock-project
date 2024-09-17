import * as yup from 'yup';

export const schema = yup.object().shape({
  login: yup
    .string()
    .test(
      'is-email-or-username',
      'Enter a valid email or username',
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      }
    )
    .required('Email or username is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
