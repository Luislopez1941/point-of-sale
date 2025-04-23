import React from "react";
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Inventory from "../../../components/sidebar/sections/store/Inventories/Inventory";
import Store from "../../../components/sidebar/sections/store/store/Store";
import Tickets from "../../../components/sidebar/sections/store/tickets/Tickets";

const RouteStore: React.FC = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Store />} />
      <Route path={`/${PrivateRoutes.INVENTORY}`} element={<Inventory />} />
      <Route path={`/${PrivateRoutes.TICKETS}`} element={<Tickets />} />
    </Routes>
  );
};

export default RouteStore;