import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import ModalRoles from './modal-roles/ModalRoles';
import './Roles.css'

const Roles: React.FC = () => {
    const [companies] = useState<any>([
        {
            tradeName: 'TechWorld',
            businessName: 'TechWorld S.A. de C.V.',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
            industry: 'Electronics'
        },
        {
            tradeName: 'ModaPlus',
            businessName: 'ModaPlus Textiles S.A.',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
            industry: 'Clothing'
        },
        {
            tradeName: 'CasaIdeal',
            businessName: 'CasaIdeal Home Solutions S.A.',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
            industry: 'Furniture and Home'
        },
        {
            tradeName: 'GreenMarket',
            businessName: 'GreenMarket Organic Foods S. de R.L.',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
            industry: 'Organic Food'
        },
        {
            tradeName: 'AutoFix',
            businessName: 'AutoFix Repair S.A.',
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
            industry: 'Automotive'
        }
    ]);



    const dispatch = useDispatch();


    const handleModalChange = (value: any) => {
        dispatch(modal(value));
    };

    const updateModalCategories = (_: any) => {

    }



    return (
        <div className='roles'>
            <div className='roles__container'>
                <div className='row__one'>
                    <div>
                        <button className='btn__general-primary' onClick={() => handleModalChange('roles_modal')}>Crear nuevo rol</button>
                    </div>
                </div>
                <div className='table__roles' >
                    <div>
                        {companies ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de roles</p>
                                <div className='quantities_tables'>{companies.length}</div>
                            </div>
                        ) : (
                            <p className='text'>No hay roles</p>
                        )}
                    </div>
                    <div className='table__head'>
                        <div className='thead'>
                            <div className='th'>
                                <p className=''>Nombre</p>
                            </div>
                            <div className='th'>
                                <p className=''>Razon social</p>
                            </div>
                            <div className='th'>

                            </div>
                            <div className='th'>

                            </div>
                        </div>
                    </div>
                    {companies?.length > 0 ? (
                        <div className='table__body'>
                            {companies?.map((item: any, index: any) => (
                                <div className='tbody__container' key={index}>
                                    <div className='tbody'>
                                        <div className='td'>
                                            <p></p>
                                            {item.tradeName}
                                        </div>
                                        <div className='td'>
                                            {item.businessName}
                                        </div>
                                        <div className='td'>
                                            <button className='btn__general-primary' type='button' onClick={() => updateModalCategories(item)}>Editar</button>
                                        </div>
                                        <div className='td'>
                                            <button className='btn__general-danger' type='button'>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text'>No hay máximos y mínimos que mostrar</p>
                    )}
                </div>
                <ModalRoles />
            </div>
        </div>
    )
}

export default Roles
