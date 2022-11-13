import * as Yup from "yup";
export const _productScheme = Yup.object().shape({
  name: Yup.string().required("This field is Required."),
  });

  export interface productScheme {
    name: string;
  }