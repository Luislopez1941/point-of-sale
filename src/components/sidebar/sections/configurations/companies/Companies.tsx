import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import ModalCompanies from './modal-companies/ModalCompanies';
import { setCompanies } from '../../../../../redux/state/Configurations/Companies';
import './Companies.css'
import APIs from '../../../../../services/APIs';

const Companies: React.FC = () => {


    const dispatch = useDispatch();
    const companies = useSelector((store: any) => store.companies || []);
  const userState = useSelector((store: any) => store.user);



    const handleModalChange = (value: any) => {
        dispatch(modal(value));
    };

    const fecth = async () => {
        try {
            let response: any = await APIs.getCompanies(userState.id)
            dispatch(setCompanies(response.data));
        } catch (error) {

        }
    }

    useEffect(() => {
        fecth()
    }, [])

    const updateModalCategories = (_: any) => {

    }

    return (
        <div className='companies'>
            <div className='companies__container'>
                <div className='row__one'>
                    <div>
                        <button className='btn__general-primary' onClick={() => handleModalChange('companies_modal')}>Crear nueva empresa</button>
                    </div>
                </div>
                <div className='table__companies' >
                    <div>
                        {companies ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de Ordenes</p>
                                <div className='quantities_tables'>{companies.length}</div>
                            </div>
                        ) : (
                            <p className='text'>No hay empresas</p>
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
                                            {item.name}
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
                <ModalCompanies />
            </div>
        </div>
    )
}

export default Companies
