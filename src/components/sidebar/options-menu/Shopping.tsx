import React from 'react'
import './styles/Store.css'
import { Link } from 'react-router-dom'
import { PrivateRoutes } from '../../../models/routes'

const Shopping: React.FC = () => {
    return (
        <div className='options__menu-store'>
            <div className='item'>
                <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SHOPPING}/${PrivateRoutes.REQUISITION}`} title="Payments" className="tooltip">
                    <p>Requisicion</p>
                </Link>
            </div>
            <div className='item'>
                <Link to={`/${PrivateRoutes.PRIVATE}/${PrivateRoutes.SHOPPING}/${PrivateRoutes.PURCHASEORDERS}`} title="Payments" className="tooltip">
                    <p>Orden de compra</p>
                </Link>
            </div>
        </div>
    )
}

export default Shopping
