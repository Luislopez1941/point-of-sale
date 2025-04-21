import React, { useEffect, useState } from 'react';
import './ModalBranchOffices.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import Select from '../../../../../general/Select';
import APIs from '../../../../../../services/APIs';
import { setBranch } from '../../../../../../redux/state/Configurations/Branch';
import Swal from 'sweetalert2';


const ModalBranchOffices = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);
  const userState = useSelector((store: any) => store.user);
  const select = useSelector((store: any) => store.select);

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
    // dispatch(updateAdministrator('reset'));
  
  };

  const [companies, setCompanies] = useState<any>([])
  const fetch = async () => {
    let response: any = await APIs.getCompanies(userState.id)
    setCompanies({
      selectName: 'Series',
      dataSelect: response.data,
      options: 'name',
    })
  }

  console.log(companies)

  useEffect(() => {
    fetch()
  }, [])




  // Estado inicial para los campos del formulario
  const [fields, setFields] = useState<any>({
    companyId: null,
    name: '',
    address: '',
    
    // token: token
  });




  const createAdministrator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    

      let data = {
        name: fields.name,
        address: fields.address,
        companyId: select.selectedItems.empresa.id
      }
      
      const response: any = await APIs.cresteBranch(data);
      Swal.fire({
        icon: 'success',
        title: 'Sucursal creada',
        text: response.message,
      });
      let dataG = {
        userId: userState.id,
        companyId: 0
    }
      let result: any = await APIs.getBranch(dataG)
      dispatch(setBranch(result.data));
      // dispatch(setBranch(response.data));
  
      // Mostrar alerta de éxito con Swal
      
    } catch (error) {
      console.error('Error al crear sucursal:', error);
  
      // Mostrar alerta de error con Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al crear la sucursal.',
      });
    }
  };



  return (
    <div className={`overlay__branch-offices_modal ${modalState === 'branch-offices_modal' ? 'active' : ''}`}>
      <div className={`popup__branch-offices_modal ${modalState === 'branch-offices_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__branch-offices_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Nueva sucursal</p>
        </div>
        <form className='branch-offices_modal' onSubmit={createAdministrator}>
          <div className='branch-offices_modal_container'>
            <div className='row__one'>
              <div>
                <Select dataSelects={companies} instanceId="empresa" nameSelect="Empresa" />
              </div>
              <div>
                <label className='label__general'>Nombre de sucursal</label>
                <input className='inputs__general' value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} placeholder='Nombre de sucursal' type="text" />
              </div>
              <div>
                <label className='label__general'>Dirección</label>
                <input className='inputs__general' value={fields.address} onChange={(e) => setFields({ ...fields, address: e.target.value })} placeholder='Nombre' type="text" />
              </div>
            </div>
            <div className='row__two'>
              <div>
                <button className='btn__general-primary'>Crear nueva sucursal</button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalBranchOffices;
