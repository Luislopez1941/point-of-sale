import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import ModalBranchOffices from './modal-branch-offices/ModalBranchOffices';
import './BranchOffices.css'
import APIs from '../../../../../services/APIs';
import { setBranch } from '../../../../../redux/state/Configurations/Branch';



const BranchOffices: React.FC = () => {
    const branch = useSelector((store: any) => store.branch || []);
    const userState = useSelector((store: any) => store.user);


    console.log('branch', branch)


    const fetch = async () => {
        let data = {
            userId: userState.id,
            companyId: 0
        }
        try {
            let response: any = await APIs.getBranch(data)
            dispatch(setBranch(response.data));
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])


    const dispatch = useDispatch();


    const handleModalChange = (value: any) => {
        dispatch(modal(value));

        console.log(value)
    };

    const updateModalCategories = (_: any) => {

    }


    return (
        <div className='branch-office'>
            <div className='branch-office__container'>
                <div className='row__one'>
                    <div>
                        <button className='btn__general-primary' onClick={() => handleModalChange('branch-offices_modal')}>Crear nueva sucursal</button>
                    </div>
                </div>
                <div className='table__branch-offices' >
                    <div>
                        {branch ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de Ordenes</p>
                                <div className='quantities_tables'>{branch.length}</div>
                            </div>
                        ) : (
                            <p className='text'>No hay empresas</p>
                        )}
                    </div>
                    <div className='table__head'>
                        <div className='thead'>
                            <div className='th'>
                                <p className=''>Empresa</p>
                            </div>
                            <div className='th'>
                                <p className=''>Sucursal</p>
                            </div>
                            <div className='th'>
                                <p className=''>Direecion</p>
                            </div>
                            <div className='th'>

                            </div>
                            <div className='th'>

                            </div>
                        </div>
                    </div>
                    {branch?.length > 0 ? (
                        <div className='table__body'>
                            {branch?.map((item: any, index: any) => (
                                <div className='tbody__container' key={index}>
                                    <div className='tbody'>
                                        <div className='td'>
                                            <p></p>
                                            {item.company.name}
                                        </div>
                                        <div className='td'>
                                            {item.name}
                                        </div>
                                        <div className='td'>
                                            {item.address}
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
            </div>

            <ModalBranchOffices />
        </div>
    )
}

export default BranchOffices
