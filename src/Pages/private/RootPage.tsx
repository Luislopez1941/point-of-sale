import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom';
import RouteSales from '../../routes/sections/sales/RouteSales';
import RouteStore from '../../routes/sections/store/RouteStore';
import RoutesConfigurations from '../../routes/sections/configurations/RoutesConfigurations';
import RoutescCatalogos from '../../routes/sections/catalogos/RoutescCatalogos';
import Menu from '../../components/sidebar/Menu';
import Dashboard from '../../components/sidebar/sections/dashboard/Dashboard';
import OptionsMenu from '../../components/sidebar/OptionsMenu';
import Income from '../../components/sidebar/sections/income/Income';
import Sales from '../../components/sidebar/options-menu/Sales';
import Shopping from '../../components/sidebar/options-menu/Shopping';
import Store from '../../components/sidebar/options-menu/Store';
import Settings from '../../components/sidebar/options-menu/Settings';
import Catalogo from '../../components/sidebar/options-menu/Catalogo';

import { PrivateRoutes } from '../../models/routes';
import Header from '../../components/header/Header';
import './RootPage.css'

const RootPage: React.FC = () => {
  return (
    <div className='root-page'>
      <Sidebar />
      <Menu />
      <div className='container'>
        <Header />
        <main className='main'>
          <Routes>
            <Route path={`${PrivateRoutes.SALES}/*`} element={<RouteSales />} />
            <Route path={`${PrivateRoutes.STORE}/*`} element={<RouteStore />} />
            <Route path={`${PrivateRoutes.CATALOGOS}/*`} element={<RoutescCatalogos />} />
            <Route path={`${PrivateRoutes.CONFIGURATIONS}/*`} element={<RoutesConfigurations />} />
            <Route path={`${PrivateRoutes.INCOME}/*`} element={<Income />} />
            <Route path={`/options/*`} element={<OptionsMenu />} />
            <Route path={`/`} element={<Dashboard />} />

            <Route path={PrivateRoutes.MENUSALES} element={<Sales />} />
            <Route path={PrivateRoutes.MENUSHOPPING} element={<Shopping />} />
            <Route path={PrivateRoutes.MENUSTORE} element={<Store />} />
            <Route path={PrivateRoutes.MENUSETTINGS} element={<Settings />} />
            <Route path={PrivateRoutes.MENUCATALOGOS} element={<Catalogo />} />
            <Route path={PrivateRoutes.MENUSETTINGS} element={<Settings />} />
            
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default RootPage
