import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import './Units.css'
import ModalUnits from './modal-units/ModalUnits';
import { setUnits } from '../../../../../redux/state/catalogos/Units';
import APIs from '../../../../../services/APIs';



const Units: React.FC = () => {



    const units = useSelector((store: any) => store.units || []);
    const fetch = async () => {
        let data = {
            companyId: 0,
            branchId: null
        }
        try {
            let response: any = await APIs.getUnits(data)
            dispatch(setUnits(response.data));
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
        <div className='units'>
            <div className='units__container'>
                <div className='row__one'>
                    <div>
                        <button className='btn__general-primary' onClick={() => handleModalChange('units_modal')}>Crear nueva unidad</button>
                    </div>
                </div>
                <div className='table__units'>
                    <div>
                        {units ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de Ordenes</p>
                                <div className='quantities_tables'>{units.length}</div>
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
                                <p className=''>Simbolo</p>
                            </div>
                            <div className='th'>
                                <p className=''>Predeterminado</p>
                            </div>
                            <div className='th'>

                            </div>
                            <div className='th'>

                            </div>
                        </div>
                    </div>
                    {units?.length > 0 ? (
                        <div className='table__body'>
                            {units?.map((item: any, index: any) => (
                                <div className='tbody__container' key={index}>
                                    <div className='tbody'>
                                        <div className='td'>
                                            {item.name}
                                        </div>
                                        <div className='td'>
                                            {item.symbol}
                                        </div>
                                        <div className='td'>
                                            {item.predetermined == true ?
                                                <div className='activated-status'>
                                                    <p>Si</p>
                                                </div>
                                                :
                                                <div className='idle-status' >
                                                    <p>No</p>
                                                </div>
                                            }
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
                <ModalUnits />
            </div>
        </div>
    )
}

export default Units
