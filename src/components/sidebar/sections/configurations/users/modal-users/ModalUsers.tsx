import React, { useEffect, useState } from 'react';
import './ModalCompanies.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import { useDropzone } from 'react-dropzone';



const ModalCompanies = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);


  const administratorUpdate = useSelector((state: any) => state.administrator);


  const handleModalChange = (value: any) => {
    dispatch(modal(value));

  };



  useEffect(() => {
    if (administratorUpdate) {
  
    }
  }, [administratorUpdate])








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
                <input className='inputs__general' placeholder='Nombre comercial' type="text" />
              </div>
              <div>
                <label className='label__general'>Razon social</label>
                <input className='inputs__general' placeholder='Razon social' type="text" />
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
                <button className='btn__general-primary'>Crear nueva empresa</button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalCompanies;
