import React from 'react'
import { Route, Routes} from "react-router-dom";
import { PrivateRoutes } from "../../../models/routes";
import Companies from '../../../components/sidebar/sections/configurations/companies/Companies';
import BranchOffices from '../../../components/sidebar/sections/configurations/branchOffices/BranchOffices';
import Roles from '../../../components/sidebar/sections/configurations/roles/Roles';

const RoutesConfigurations: React.FC = () => {
  return (
    <Routes>
        <Route path={`/${PrivateRoutes.COMPANIES}`} element={<Companies />} />
        <Route path={`/${PrivateRoutes.BRANCH_OFFICES}`} element={<BranchOffices />} />
        <Route path={`/${PrivateRoutes.ROLES}`} element={<Roles />} />
    </Routes>
  )
}

export default RoutesConfigurations
