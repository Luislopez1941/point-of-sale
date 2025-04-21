import React from "react";
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import SalesSheet from "../../../components/sidebar/sections/sales/sales-sheet/SalesSheet";


const RouteSales: React.FC = () => {
  return (
    <Routes>
      <Route path={`/${PrivateRoutes.SALES_SHEET}`} element={<SalesSheet />} />
    </Routes>
  );
};

export default RouteSales;