import React, { useEffect, useState } from 'react';
import './ModalCompanies.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import { useDropzone } from 'react-dropzone';
import APIs from '../../../../../../services/APIs';
import { setCompanies } from '../../../../../../redux/state/Configurations/Companies';
import Swal from 'sweetalert2';



const ModalCompanies = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);
  const userState = useSelector((store: any) => store.user);

  const administratorUpdate = useSelector((state: any) => state.administrator);


  useEffect(() => {
    if (administratorUpdate) {
     
    }
  }, [administratorUpdate])




  // Estado inicial para los campos del formulario
  const [fields, setFields] = useState<any>({
    name: '',
    businessName: '',
    email: '',
    type: 'NATURAL_PERSON',
    id: userState.id
    // token: token
  });


  const createAdministrator = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  };

  const [preview, setPreview] = useState<string | null>(null);


  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });
  const handleModalChange = (value: any) => {
    dispatch(modal(value));
    // dispatch(updateAdministrator('reset'));
    setFields({
      name: '',
      surnames: '',
      email: '',
      password: '',
      rol: '',
    });

  };


  const createCompanies = async () => {
    try {
      const response: any = await APIs.cresteCompanies(fields);
      
      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Empresa creada',
        text: response.message,
      });
  
      const result: any = await APIs.getCompanies(userState.id);
      dispatch(setCompanies(result.data));
      dispatch(modal(''));
      setFields({
        name: '',
        businessName: '',
      });
    } catch (error) {
      console.error(error);
  
      // Mostrar alerta de error
      Swal.fire({
        icon: 'error',
        title: 'Error al crear empresa',
        text: 'Hubo un problema al crear la empresa. Inténtalo de nuevo.',
      });
    }
  };
  return (
    <div className={`overlay__companies_modal ${modalState === 'companies_modal' ? 'active' : ''}`}>
      <div className={`popup__companies_modal ${modalState === 'companies_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__companies_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Nueva empresa</p>
        </div>
        <form className='companies_modal' onSubmit={createAdministrator}>
          <div className='companies_modal_container'>
            <div className='row__one'>
              <div>
                <label className='label__general'>Nombre comercial</label>
                <input className='inputs__general' value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} placeholder='Nombre comercial' type="text" />
              </div>
              <div>
                <label className='label__general'>Razon social</label>
                <input className='inputs__general' value={fields.businessName} onChange={(e) => setFields({ ...fields, businessName: e.target.value })} placeholder='Razon social' type="text" />
              </div>
            </div>
            <div className='row__two'>
              <div className='image'>
                <div {...getRootProps({ className: 'dropzone' })}>
                  <input {...getInputProps()} />
                  {
                    isDragActive
                      ? <p className="dropzone__text">Suelta la imagen aquí...</p>
                      : preview
                        ? <img src={preview} alt="preview" className="preview-image" />
                        : <p className="dropzone__text">Haz clic o arrastra una imagen</p>
                  }
                </div>
              </div>
            </div>
            <div className='row__three'>
              <div>
                <button className='btn__general-primary' onClick={createCompanies}>Crear nueva empresa</button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalCompanies;
