import React, { useEffect, useState } from 'react'
import './styles/Units.css'
import { useDispatch, useSelector } from "react-redux";
import { setModal } from '../../../../../../../redux/state/store/Inventory';
import APIs from '../../../../../../../services/APIs';
import Select from '../../../../../../general/Select';
import { setUnits } from '../../../../../../../redux/state/store/Inventory';

const Units: React.FC = () => {

  const dispatch = useDispatch();
  const modalState = useSelector((state: any) => state.inventory.modal);
  const units = useSelector((state: any) => state.inventory.units);

  const select = useSelector((store: any) => store.select);

  console.log(select)

  const [selectUnits, setSelectUnits] = useState<any>([])
  const fetch = async () => {
    let data = {
      companyId: 0,
      branchId: null
    }
    try {
      let response: any = await APIs.getUnits(data)

      setSelectUnits({
        selectName: "Unidades",
        dataSelect: response.data,
        options: 'name',
      })
    } catch (error) {

    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleModalChange = (value: any) => {
    dispatch(setModal(value));
  };

  const addUnit = () => {
    let data = {
      name: select.selectedItems.units.name
    }
    dispatch(setUnits([...units, data]));
  }


  const deleteUnits = (_: any, i: number) => {
    let filter = units.filter((_: any, index: any) => index !== i)
    console.log(filter)
    dispatch(setUnits(filter))
  }




  return (
    <div className={`overlay__units_modal-product ${modalState === 'units_modal-product' ? 'active' : ''}`}>
      <div className={`popup__units_modal-product ${modalState === 'units_modal-product' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__units_modal-product" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Unidades</p>
        </div>
        <div className='units_modal-product'>
          <div className='row__one'>
            <div>
              <Select dataSelects={selectUnits} instanceId="units" nameSelect="Unidades" />
            </div>
            <div>
              <label className='label__general'>Valor</label>
              <input className='inputs__general' placeholder='valor' type="text" name="" id="" />
            </div>
            <div className='btn_add'>
              <button className='btn__general-primary' onClick={addUnit}>Agregar</button>
            </div>
          </div>
          <div className='table_units_modal-products' >
            <div>
              {units ? (
                <div className='table__numbers'>
                  <p className='text'>Total de almacenes</p>
                  <div className='quantities_tables'>{units.length}</div>
                </div>
              ) : (
                <p className='text'>No hay empresas</p>
              )}
            </div>
            <div className='table__head'>
              <div className='thead'>
                <div className='th '>
                  <p className=''>Nombre</p>
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
            {units?.length > 0 ? (
              <div className='table__body'>
                {units?.map((item: any, index: any) => (
                  <div className='tbody__container' key={index}>
                    <div className='tbody-desk'>
                      <div className='td'>
                        {item.name}
                      </div>
                      <div className='td movil'>
                        {item.companyName}
                      </div>
                      <div className='td movil'>
                        {item.branchName == 0 ? item.branchName : 'N/A'}
                      </div>
                      <div className='td'>
                        <div className='delete-icon' onClick={() => deleteUnits(item, index)}>
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
                        {item.branchName == 0 ? item.branchName : 'N/A'}
                      </div>
                      <div className='td'>
                        <div className='delete-icon' onClick={() => deleteUnits(item, index)}>
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
        </div>
      </div>
    </div>
  )
}

export default Units