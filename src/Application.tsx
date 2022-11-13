import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TablePageItems from "./pages/TablePageItems";
// import LoginPage from './pages/Login';
// import HomePage from './pages/Login';

interface Props {}

const Application: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<TablePageItems />}></Route>
          {/* <Route path="/about" element={<AboutPage />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Application;
