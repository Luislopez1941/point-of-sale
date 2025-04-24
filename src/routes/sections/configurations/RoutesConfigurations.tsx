import React from 'react'
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Companies from '../../../components/sidebar/sections/configurations/companies/Companies';
import BranchOffices from '../../../components/sidebar/sections/configurations/branchOffices/BranchOffices';
import Roles from '../../../components/sidebar/sections/configurations/roles/Roles';
import Series from '../../../components/sidebar/sections/configurations/series/Series';

const RoutesConfigurations: React.FC = () => {
  return (
    <Routes>
        <Route path={`/${PrivateRoutes.COMPANIES}`} element={<Companies />} />
        <Route path={`/${PrivateRoutes.BRANCH_OFFICES}`} element={<BranchOffices />} />
        <Route path={`/${PrivateRoutes.ROLES}`} element={<Roles />} />
        <Route path={`/${PrivateRoutes.SERIES}`} element={<Series />} />
    </Routes>
  )
}

export default RoutesConfigurations
