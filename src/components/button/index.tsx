import { FC } from "react";
import { Button, ButtonProps } from "react-bootstrap";

export const CustomButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <>
      <Button size="sm" variant="dark" {...props}>
        {typeof children === "string" ? (
          <b>{children.toUpperCase()}</b>
        ) : (
          children
        )}
      </Button>
    </>
  );
};
