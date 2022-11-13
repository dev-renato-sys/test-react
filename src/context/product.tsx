import { AxiosResponse } from "axios";
import React, { createContext } from "react";
import { Product, _id } from "../dtos/Product";
import api from "../helpers/api";

interface ProductContextProps {
  getProducts: () => Promise<Product[]>;
  postProduct: ({ name }: { name: string }) => Promise<void>;
  deleteProduct: ({ _id }: { _id: _id }) => Promise<void>;
}

const ProductContext = createContext<ProductContextProps>(
  {} as ProductContextProps
);

interface ProductProviderProps {
  children: React.ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const getProducts = async (): Promise<Product[]> => {
    return await api
      .get("product")
      .then((response: AxiosResponse) => {
        // console.log(response.data);
        return response.data as Product[];
      })
      .catch((reason: any) => {
        alert("API error, please check routes and your database");
        return [] as Product[];
      });
  };

  const postProduct = async ({ name }: { name: string }): Promise<void> => {
    return await api
      .post("product", { name })
      .then((response: AxiosResponse) => {
        // console.log(response.data);
        return;
      })
      .catch((reason: any) => {
        alert("API error, please check routes and your database");
        return;
      });
  };

  const deleteProduct = async ({ _id }: { _id: _id }): Promise<void> => {
    return await api
      .delete(`product/${_id.$oid}`)
      .then((response: AxiosResponse) => {
        // console.log(response.data);
        return;
      })
      .catch((reason: any) => {
        alert("API error, please check routes and your database");
        return;
      });
  };

  return (
    <ProductContext.Provider
      value={{ getProducts, postProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export function useProducts() {
  const context = React.useContext(ProductContext);

  return context;
}

export default ProductContext;
