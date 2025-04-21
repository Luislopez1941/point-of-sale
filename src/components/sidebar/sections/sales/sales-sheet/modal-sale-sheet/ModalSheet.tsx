import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './ModalSheet.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import APIs from '../../../../../../services/APIs';


const ModalSheet = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);

  const administratorUpdate = useSelector((state: any) => state.administrator);

  const token: any = localStorage.getItem('token-eco');

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
    // dispatch(updateAdministrator('reset'));
    setData({
      name: '',
      surnames: '',
      email: '',
      password: '',
      rol: '',
    });

  };

  console.log(administratorUpdate)

  useEffect(() => {
    if (administratorUpdate) {
      setData({
        name: administratorUpdate.name,
        surnames: administratorUpdate.surnames,
        email: administratorUpdate.email,
        rol: administratorUpdate.rol,
        token: token
      });
    }
  }, [administratorUpdate])

 




  // Estado inicial para los campos del formulario
  const [data, setData] = useState<any>({
    name: '',
    surnames: '',
    email: '',
    password: '',
    rol: '',
    token: token
  });


  const createAdministrator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (administratorUpdate) {

      try {
        const result: any = await APIs.updateAdministrator(administratorUpdate._id, { email: data.email, rol: data.rol }, token);
        Swal.fire({
          title: result.status === 'warning' ? 'Advertencia' : 'Éxito',
          text: result.message,
          icon: result.status === 'warning' ? 'warning' : 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el administrador',
          icon: 'error'
        });
      }
    } else {
      try {
        const result: any = await APIs.createAdministrator(data);
        Swal.fire({
          title: result.status === 'warning' ? 'Advertencia' : 'Éxito',
          text: result.message,
          icon: result.status === 'warning' ? 'warning' : 'success'
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Hubo un error al crear el administrador',
          icon: 'error'
        });
      }
    }


  };

  return (
    <div className={`overlay__sales-sheet_modal ${modalState === 'sales-sheet_modal' ? 'active' : ''}`}>
      <div className={`popup__sales-sheet_modal ${modalState === 'sales-sheet_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__sales-sheet_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Venta</p>
        </div>
        <form className='sales-sheet_modal' onSubmit={createAdministrator}>
          <div className='sales-sheet_modal_container'>
            <div className='row__one'>
              <div className='search'>
                <div className='inputs__general_icons'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                  <input className='inputs__generic' placeholder='Buscar' type="text" name="" id="" />
                </div>
                <div>
                  <button className='btn__general-primary'>Agregar</button>
                </div>
              </div>
            </div>
            <div className='table_sales-sheet_modal' >
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
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalSheet;
