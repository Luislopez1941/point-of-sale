import React from 'react'
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Categories from '../../../components/sidebar/sections/categories/Categories';
import Units from '../../../components/sidebar/sections/catalogos/units/Units';

const RoutescCatalogos: React.FC = () => {
  return (
    <Routes>
   
        <Route path={`/${PrivateRoutes.CATEGORIES}`} element={<Categories />} />
        <Route path={`/${PrivateRoutes.UNITS}`} element={<Units />} />
    </Routes>
  )
}

export default RoutescCatalogos
