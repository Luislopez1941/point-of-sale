import React from 'react';
import './ModalTickets.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';


const ModalInventory: React.FC = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);



  const handleModalChange = (value: any) => {
    dispatch(modal(value));
    // dispatch(updateAdministrator('reset'));


  };



  return (
    <div className={`overlay__tickets_modal ${modalState === 'tickets_modal' ? 'active' : ''}`}>
      <div className={`popup__tickets_modal ${modalState === 'tickets_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__tickets_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Venta</p>
        </div>
        <form className='tickets_modal'>
          <div className='tickets_modal_container'>

          
              
          </div>
          <div className='row__three'>
            <button className='btn__general-primary'>Crear producto</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalInventory;
