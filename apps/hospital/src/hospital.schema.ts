import * as yup from 'yup';

export const HospitalSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  hospitalId: yup.string().required(),
  address: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zipCode: yup.string().required(),
  phoneNumber: yup.string().required(),
});
