import React from "react";
import { CustomTable } from "../../components/table";
import { Col, Form, FormControl, Row } from "react-bootstrap";
import { CustomButton } from "../../components/button";
import { CustomPagination } from "../../components/pagination";
import { paginate } from "../../helpers/pagination";
import { useModal } from "../../context/modal";
import FormProduct from "./formProduct";
import { Product, _id } from "../../dtos/Product";
import moment from "moment";
import { useProducts } from "../../context/product";

interface TablePageItems {}

const _TablePageItems = (props: TablePageItems): JSX.Element => {
  const { isOpen, openModal } = useModal();
  const [search, setSearch] = React.useState("");
  const [records, setRecords] = React.useState<Product[]>([]);
  const [isLoading] = React.useState<boolean>(false);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(5);

  const { getProducts, deleteProduct } = useProducts();

  const _makeData = React.useCallback(() => {
    getProducts().then((response: Product[]) => {
      setRecords(response);
    });
  }, [getProducts]);

  const _delete = ({ _id }: { _id: _id }): void => {
    deleteProduct({ _id: _id }).then((value: void) => {
      alert("Registro deletado com sucesso!");
      _makeData();
    });
  };

  React.useEffect(() => {
    _makeData();
  }, [_makeData, isOpen]);

  const filteredRecords = React.useMemo(() => {
    return paginate(
      records.filter((el: Product) => {
        let found = true;

        if (
          search &&
          [
            String(el?._id.$oid).toLowerCase(),
            String(el?.name).toLowerCase(),
            String(el?.createdAt.$date).toLowerCase(),
          ].includes(search.toLowerCase()) === false
        )
          found = false;

        return found;
      }),
      pageSize,
      pageNumber
    );
  }, [pageNumber, pageSize, search, records]) as Product[];

  return (
    <>
      <div className="p-5">
        <Row className="space-around d-flex align-items-center gap-2">
          <Col>showing {filteredRecords.length} entries</Col>
          <Col sm="2">
            <FormControl
              type="search"
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Col>
        </Row>
        <br></br>
        <CustomTable>
          <thead>
            <tr>
              <th>product name</th>
              <th>created at</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0
              ? filteredRecords.map((product: Product) => {
                  return (
                    <tr key={product._id.$oid.toString()}>
                      <td>{product.name}</td>
                      <td>{moment(product.createdAt.$date).format("d MMM")}</td>
                      <td>
                        <CustomButton
                          variant="danger"
                          onClick={() => {
                            _delete({ _id: product._id });
                          }}
                        >
                          Delete
                        </CustomButton>
                      </td>
                    </tr>
                  );
                })
              : (isLoading && (
                  <>
                    <tr>
                      <td colSpan={3} className="p-4">
                        carregando..
                      </td>
                    </tr>
                  </>
                )) || (
                  <>
                    <tr>
                      <td colSpan={3} className="p-4">
                        nenhum produto encontrado.
                      </td>
                    </tr>
                  </>
                )}
          </tbody>
          <tfoot>
            {filteredRecords.length > 0 && (
              <tr>
                <td colSpan={3} className="p-4">
                  <CustomPagination
                    value={Math.ceil(records.length / pageSize)}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </td>
              </tr>
            )}
          </tfoot>
        </CustomTable>
        <Row className="gap-2 d-flex justify-content-between">
          {/* <FormUser fetchData={fetchData} /> */}
          <Col sm="1">
            <Form.Select
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {/* <option>10</option> */}
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </Form.Select>
          </Col>
          <Col sm="2" className="d-flex justify-content-end">
            <CustomButton variant="primary" onClick={openModal}>
              Adicionar novo registro
            </CustomButton>
          </Col>
        </Row>
      </div>
      <FormProduct />
    </>
  );
};

export default _TablePageItems;
