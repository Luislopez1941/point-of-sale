import React from 'react'
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Requisition from '../../../components/sidebar/sections/shopping/requisition/requisition';

const RoutesShopping: React.FC = () => {
  return (
    <Routes>
        <Route path={`/${PrivateRoutes.REQUISITION}`} element={<Requisition />} />
    </Routes>
  )
}

export default RoutesShopping
