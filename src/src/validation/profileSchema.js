import * as Yup from 'yup';

export const profileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Vui lòng nhập tên')
    .min(2, 'Tên tối thiểu 2 ký tự')
    .max(50, 'Tên tối đa 50 ký tự'),
  bio: Yup.string().max(200, 'Bio tối đa 200 ký tự'),
  avatar: Yup.string()
    .trim()
    .matches(/^https?:\/\/.+/i, {
      message: 'Avatar phải là URL bắt đầu bằng http:// hoặc https://',
      excludeEmptyString: true,
    }),
});
