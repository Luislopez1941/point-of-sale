import React, { useState } from 'react'
import './SalesSheet.css'
import { useDispatch } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import ModalSheet from './modal-sale-sheet/ModalSheet';


const SalesSheet: React.FC = () => {

  const dispatch = useDispatch();

  const [data] = useState<any>([])

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
  };



  return (
    <div className='sale__sheet'>
      <div className='sale__sheet_container'>
        <div className='row__one'>
          <div className='row__one'>
            <div className='search'>
              <div className='inputs__general_icons'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                <input className='inputs__generic' placeholder='Buscar' type="text" name=""  />
              </div>
              <div>
                <button className='btn__general-primary'>Agregar</button>
              </div>
            </div>
            <div>
              <button className='btn__general-primary' onClick={() => handleModalChange('sales-sheet_modal')}>Ficha</button>
            </div>
          </div>
        </div>

        <div className='table__administrators' >
          <div>
            {data ? (
              <div className='table__numbers'>
                <p className='text'>Total de administradores</p>
                <div className='quantities_tables'>{data.length}</div>
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
                <p className=''>Apellidos</p>
              </div>
              <div className='th movil'>
                <p className=''>Email</p>
              </div>
              <div className='th movil'>
                <p className=''>Estado</p>
              </div>
              <div className='th'>

              </div>
            </div>
          </div>
          {data?.length > 0 ? (
            <div className='table__body'>
              {data?.map((item: any, index: any) => (
                <div className='tbody__container' key={index}>
                  <div className='tbody'>
                    <div className='td'>
                      {item.name}
                    </div>
                    <div className='td movil'>
                      {item.surnames}
                    </div>
                    <div className='td movil'>
                      {item.email}
                    </div>
                    {/* <div className='td movil'>
                      {item.state == true ?
                        <div className='activated-status' onClick={() => updateStatus(item)}>
                          <p>Activo</p>
                        </div>
                        :
                        <div className='idle-status' onClick={() => updateStatus(item)}>
                          <p>Inactivo</p>
                        </div>
                      }
                    </div>
                    <div className='td update'>
                      <button className='btn__general-purple' type='button' onClick={() => modalUpdate(item)}>Editar</button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text'>No hay máximos y mínimos que mostrar</p>
          )}
        </div>
        <ModalSheet />
      </div>
    </div>
  )
}

export default SalesSheet
