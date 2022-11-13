import { FC } from "react";
import { Table, TableProps } from "react-bootstrap";

export const CustomTable: FC<TableProps> = ({ children, ...props }) => {
  return (
    <Table borderless bordered hover variant="light" {...props}>
      {children}
    </Table>
  );
};
