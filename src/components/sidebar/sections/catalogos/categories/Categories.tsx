import React, { useState } from 'react'
import './Categories.css'
import { useDispatch } from "react-redux";
import { modal } from '../../../../../redux/state/modals';
import ModalCategories from './modal-categories/ModalCategories';

const Categories: React.FC = () => {


  const [categories] = useState<any>([
    {
      category: 'Electronics',
      products: [
        { id: 1, name: 'Laptop', price: 1000 },
        { id: 2, name: 'Smartphone', price: 700 }
      ]
    },
    {
      category: 'Clothing',
      products: [
        { id: 3, name: 'Shirt', price: 30 },
        { id: 4, name: 'Pants', price: 50 }
      ]
    },
    {
      category: 'Home',
      products: [
        { id: 5, name: 'Chair', price: 80 },
        { id: 6, name: 'Table', price: 150 }
      ]
    }
  ])
  

  const dispatch = useDispatch();
  

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
  };




  return (
    <div className='categories'>
      <div className='categories__container'>
        <div>
          <button className='btn__general-primary' onClick={() => handleModalChange('categories_modal')}>Crear nueva categoria</button>
        </div>
        <div className='table__categories' >
          <div>
            {categories ? (
              <div className='table__numbers'>
                <p className='text'>Total de Ordenes</p>
                <div className='quantities_tables'>{categories.length}</div>
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
                <p className=''>Genero</p>
              </div>
              <div className='th'>
                <p className=''>Email</p>
              </div>
              <div className='th'>
                <p className=''>Estado</p>
              </div>
              <div className='th'>

              </div>
              <div className='th'>

              </div>
            </div>
          </div>
          {categories?.length > 0 ? (
            <div className='table__body'>
              {categories?.map((item: any, index: any) => (
                <div className='tbody__container' key={index}>
                  <div className='tbody'>
                    <div className='td'>
                      <p></p>
                      {item.category}
                    </div>
                    {/* <div className='td'>
                      {item.gender.name}
                    </div>
                    <div className='td'>
                      {item.email}
                    </div> */}
                    {/* <div className='td'>
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
                    <div className='td'>
                      <button className='btn__general-purple' type='button' onClick={() => updateModalCategories(item)}>Editar</button>
                    </div> */}
                    {/* <div className='td'>
                                <button className='btn__general-danger' type='button'>Eliminar</button>
                            </div> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text'>No hay máximos y mínimos que mostrar</p>
          )}
        </div>
        <ModalCategories />
      </div>
    </div>
  )
}

export default Categories
