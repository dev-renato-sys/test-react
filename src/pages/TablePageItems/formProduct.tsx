import { Form, Formik } from "formik";
import React from "react";
import { Modal } from "react-bootstrap";
import { CustomButton } from "../../components/button";
import { CustomInput } from "../../components/inputs";
import { useModal } from "../../context/modal";
import { useProducts } from "../../context/product";
import { productScheme, _productScheme } from "./productScheme";

interface Props {}

const FormProduct: React.FunctionComponent<Props> = (props) => {
  const { isOpen, openModal } = useModal();

  const { postProduct } = useProducts();

  const onFormikSubmit = (values: productScheme) => {
    postProduct({ name: values.name }).then((value: void) => {
      openModal();
    });
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={openModal}
        backdrop="static"
        keyboard={false}
      >
        <Formik
          initialValues={{
            name: "",
          }}
          validationSchema={_productScheme}
          onSubmit={onFormikSubmit}
        >
          {({ errors, touched, isSubmitting, submitForm }) => (
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  <b>creating new products</b>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form className="pl-4">
                  <CustomInput
                    isSubmitting={isSubmitting}
                    name="name"
                    label="Product Name"
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <CustomButton variant="secondary" onClick={openModal}>
                  Close
                </CustomButton>
                <CustomButton
                  variant="primary"
                  onClick={submitForm}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting
                    ? "registering new product.."
                    : "add new product"}
                </CustomButton>
              </Modal.Footer>
            </>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default FormProduct;
