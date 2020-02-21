import * as Yup from 'yup';

export default async (value) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required()
  });
   
  return await schema.isValid(value.body);

}