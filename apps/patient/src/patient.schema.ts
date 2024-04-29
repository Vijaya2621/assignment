import * as yup from 'yup';

export const PatientSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  condition: yup.string().required(),
  password: yup.string().required(),
  dateOfBirth: yup.string().required(),
  education: yup.string().required(),
  weight: yup.string(),
  height: yup.string(),
  enrolledDate: yup.string(),
  phoneNumber: yup.string().required(),
});
