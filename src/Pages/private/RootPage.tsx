import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import RouteSales from '../../routes/sections/sales/RouteSales';
import RouteStore from '../../routes/sections/store/RouteStore';
import RoutesConfigurations from '../../routes/sections/configurations/RoutesConfigurations';
import RoutescCatalogos from '../../routes/sections/catalogos/RoutescCatalogos';

import { PrivateRoutes } from '../../models/routes';
import Header from '../../components/header/Header';
import './RootPage.css'

const RootPage: React.FC = () => {
  return (
    <div className='root-page'>
      <Sidebar />
      <div className='container'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path={`${PrivateRoutes.SALES}/*`} element={<RouteSales />} />
            <Route path={`${PrivateRoutes.STORE}/*`} element={<RouteStore />} />
            <Route path={`${PrivateRoutes.CATALOGOS}/*`} element={<RoutescCatalogos />} />
            <Route path={`${PrivateRoutes.CONFIGURATIONS}/*`} element={<RoutesConfigurations />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default RootPage
