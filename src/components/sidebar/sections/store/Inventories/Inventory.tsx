import React, { useEffect, useState } from 'react'
import './Inventory.css'
import { modal } from '../../../../../redux/state/modals'
import { useDispatch } from 'react-redux';// Importa la interfaz AppStore
import ModalInventory from './modal-inventory/ModalAddProduct';
import APIs from '../../../../../services/APIs';


const Inventory: React.FC = () => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState<any>([])

    const fetch = async () => {
      // let data = {
      //     companyId: 0,
      //     branchId: 0
      // }

      try {
          let response: any = await APIs.getProducts()
          setProducts(response.data)
      } catch (error) {

      }
  }

  useEffect(() => {
      fetch()
  }, [])

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
  };

  console.log(products)

   

  return (
    <div className='inventory'>
      <div className='inventory__container'>
        <div className='row__one'>
            <div>
                <button className='btn__general-primary' onClick={() => handleModalChange('inventory_modal')}>Agregar producto</button>
            </div>
        </div>
        <div className='table__inventory' >
          <div>
            {products ? (
              <div className='table__numbers'>
                <p className='text'>Total de administradores</p>
                <div className='quantities_tables'>{products.length}</div>
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
          {products?.length > 0 ? (
            <div className='table__body'>
              {products?.map((item: any, index: any) => (
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
                      <button className='btn__general-primary' type='button' onClick={() => modalUpdate(item)}>Editar</button>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text'>No hay máximos y mínimos que mostrar</p>
          )}
        </div>
        <ModalInventory />
      </div>
    </div>
  )
}

export default Inventory
