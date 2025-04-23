import React, { useEffect } from 'react'
import './Store.css'
import { modal } from '../../../../../redux/state/modals'
import { useDispatch, useSelector } from 'react-redux';
import ModalStore from './modal-store/ModalStore';
import APIs from '../../../../../services/APIs';
import { setStore } from '../../../../../redux/state/store/Store';


const Store: React.FC = () => {

    const dispatch = useDispatch();
    const warehouses = useSelector((store: any) => store.store || []);
    // const userState = useSelector((store: any) => store.user);

    const fetch = async () => {
        let data = {
            companyId: 0,
            branchId: 0
        }
        try {
            let response: any = await APIs.getWarehouses(data)
            dispatch(setStore(response.data));
        } catch (error) {

        }
    }

    useEffect(() => {
        fetch()
    }, [])


    const handleModalChange = (value: any) => {
        dispatch(modal(value));
    };



    return (
        <div className='store'>
            <div className='store__container'>
                <div className='row__one'>
                    <div>
                        <button className='btn__general-primary' onClick={() => handleModalChange('store_modal')}>Crear nuevo almacén</button>
                    </div>
                </div>
                <div className='table__store' >
                    <div>
                        {warehouses ? (
                            <div className='table__numbers'>
                                <p className='text'>Total de administradores</p>
                                <div className='quantities_tables'>{warehouses.length}</div>
                            </div>
                        ) : (
                            <p className='text'>No hay empresas</p>
                        )}
                    </div>
                    <div className='table__head'>
                        <div className='thead'>
                            <div className='th '>
                                <p className=''>Nombres</p>
                            </div>
                            <div className='th movil'>
                                <p className=''>Empresa</p>
                            </div>
                            <div className='th movil'>
                                <p className=''>Sucursal</p>
                            </div>
                            <div className='th movil'>
                                <p className=''>Estado</p>
                            </div>
                            <div className='th'>

                            </div>
                        </div>
                    </div>
                    {warehouses?.length > 0 ? (
                        <div className='table__body'>
                            {warehouses?.map((item: any, index: any) => (
                                <div className='tbody__container' key={index}>
                                    <div className='tbody-desk'>
                                        <div className='td'>
                                            {item.name}
                                        </div>
                                        <div className='td movil'>
                                            {item.companyName}
                                        </div>
                                        <div className='td movil'>
                                            {item.branchName}
                                        </div>
                                        {/* <div className='td movil'>
                                            {item.predetermined == true ?
                                                <div className='activated-status' onClick={() => updateStatus(item)}>
                                                    <p>Activo</p>
                                                </div>
                                                :
                                                <div className='idle-status' onClick={() => updateStatus(item)}>
                                                    <p>Inactivo</p>
                                                </div>
                                            }
                                        </div> */}
                                        <div className='td edit'>
                                            <div className='edit-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                            </div>
                                        </div>
                                        <div className='td delete'>
                                            <div className='delete-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className=" icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='tbody-response'>
                                        <div className='td'>
                                            {item.name}
                                        </div>
                                        <div className='td movil'>
                                            {item.companyName}
                                        </div>
                                        <div className='td movil'>
                                            {item.branchName}
                                        </div>
                                        <div className='td edit'>
                                            <div className='edit-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                            </div>
                                        </div>
                                        <div className='td delete'>
                                            <div className='delete-icon'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className=" icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className='text'>No hay máximos y mínimos que mostrar</p>
                    )}
                </div>
                <ModalStore />
            </div>
        </div>
    )
}

export default Store
