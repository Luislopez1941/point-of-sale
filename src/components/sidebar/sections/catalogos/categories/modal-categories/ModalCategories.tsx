import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './ModalCategories.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import APIs from '../../../../../../services/APIs';



const ModalCategories = () => {

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
    <div className={`overlay__categories_modal ${modalState === 'categories_modal' ? 'active' : ''}`}>
      <div className={`popup__categories_modal ${modalState === 'categories_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__categories_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Nueva categoría</p>
        </div>
        <form className='categories_modal' onSubmit={createAdministrator}>
          <div className='categories_modal_container'>
            <div className='row__one'>
              <div>
                <label className='label__general'>Nombre</label>
                <input className='inputs__general' placeholder='Nombre' type="text" />
              </div>
            </div>
            <div className='row__two'>
              <div>
                <button className='btn__general-primary'>Crear categoría</button>
              </div>
            </div>
        
          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalCategories;
