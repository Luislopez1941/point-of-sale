import React, { useEffect, useState } from 'react'
import './Categories.css'
import Modal from './Modal'
import './Modal.css'
import { useDispatch } from 'react-redux'
import { modal } from '../../../../redux/state/modals';
import { useSelector } from 'react-redux'
import APIs from '../../../../services/APIs'



const Categories: React.FC = () => {

  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories.categories);

 

  const setModal = (value: any) => {
    dispatch(modal(value));
  };

  let token = localStorage.getItem('token-eco')

  const fetch = async () => {

    let classification = 1
    try {
      let result: any = await APIs.getCategories(classification, token)
      console.log(result)
  
    } catch (error) {

    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const getCategories = async (value: any) => {
    console.log(value)
    let result: any = await APIs.getCategories(value, token)
    console.log(result)
  
  }

  const [search, setSearch] = useState<any>()

  const updateStatus = async (_: any) => {


  }

  const updateModalCategories = (_: any) => {
    setModal('categories-modal-update')
  }

  return (
    <div className='categories'>
      <div className='categories__container'>
        <div className='row__one'>
          <div className='classifications'>
            <div>
              <button className='btn__general-purple' onClick={() => getCategories(1)}>Masculino</button>
            </div>
            <div>
              <button className='btn__general-purple' onClick={() => getCategories(2)}>Femenino</button>
            </div>
            <div>
              <button className='btn__general-purple' onClick={() => getCategories(3)}>Niños</button>
            </div>
            <div>
              <button className='btn__general-purple' onClick={() => getCategories(4)}>Niñas</button>
            </div>
          </div>
          <div>
            <button className='btn__general-purple' onClick={() => setModal('categories-modal')}>Crear subcategoría</button>
          </div>
        </div>
        <div>
          <div className='input__search'>
            <div>
              <input className='inputs__general' value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Buscar' />
            </div>
            <div className='icon__search'>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#f5f6f7"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
            </div>
          </div>
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
                      {item.title}
                      <p>{item.createdAt}</p>
                    </div>
                    <div className='td'>
                      {item.gender.name}
                    </div>
                    <div className='td'>
                      {item.email}
                    </div>
                    <div className='td'>
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
                    </div>
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
      </div>
      <Modal />
    </div>
  )
}

export default Categories
