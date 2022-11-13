import { FC } from "react";
import { FieldHookConfig, useField } from "formik";
import { Alert, Form } from "react-bootstrap";
interface ICustomFieldProps {
  label: string;
  isPassword?: boolean;
  isSubmitting: boolean;
}

export const CustomInput: FC<FieldHookConfig<string> & ICustomFieldProps> = ({
  label,
  isPassword,
  isSubmitting,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <>
      <Form.Group className="mb-2">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          placeholder={label}
          disabled={isSubmitting}
          type={isPassword ? "password" : "text"}
          {...field}
          isValid={meta.touched && !meta.error}
        />
      </Form.Group>
      {meta.touched && meta.error ? (
        <Alert className="alert p-1 alert-danger text-center">
          {meta.error}
        </Alert>
      ) : null}
    </>
  );
};
