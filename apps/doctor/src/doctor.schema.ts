import * as yup from 'yup';

export const DoctorSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  emailVerified: yup.boolean().required(),
  image: yup.string().required(),
  active: yup.boolean().required(),
  specialzation: yup.string().required(),
  licenseNumber: yup.string().required(),
  phoneNumber: yup.string().required(),
});
