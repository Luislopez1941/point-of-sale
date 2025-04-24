import React from 'react'
import './styles/Store.css'
import { Link } from 'react-router-dom'
import { PrivateRoutes } from '../../../models/routes'

const Store: React.FC = () => {
    return (
        <div className='options__menu-store'>
            <div className='item'>
                <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.STORE}`} title="Payments" className="tooltip">
                    <p>Almacenes</p>
                </Link>
            </div>
            <div className='item'>
                <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.STORE}/${PrivateRoutes.INVENTORY}`} title="Payments" className="tooltip">
                    <p>Inventario</p>
                </Link>
            </div>
            <div className='item'>
                <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.STORE}/${PrivateRoutes.TICKETS}`} title="Payments" className="tooltip">
                    <p>Entradas</p>
                </Link>
            </div>
        </div>
    )
}

export default Store
