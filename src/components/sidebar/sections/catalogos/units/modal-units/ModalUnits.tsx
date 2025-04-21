import React, { useEffect, useState } from 'react';
import './ModalUnits.css';
import { useDispatch, useSelector } from "react-redux";
import { modal } from '../../../../../../redux/state/modals';
import APIs from '../../../../../../services/APIs';
import Swal from 'sweetalert2';



const ModalUnits = () => {

  const dispatch = useDispatch();

  // Asegúrate de que el tipo de state es AppStore
  const modalState = useSelector((state: any) => state.modals);
  const userState = useSelector((store: any) => store.user);

  const administratorUpdate = useSelector((state: any) => state.administrator);


  const fetch = async () => {
    try {
      let response: any = await APIs.getCompanies(userState.id)
      setSelectCompany((prevState: any) => ({
        ...prevState,
        companies: response.data,
      }));

      let data = {
        userId: userState.id,
        companyId: response.data[0].id
      }
      let result: any = await APIs.getBranch(data)
      result.data.unshift({
        id: 0,
        name: "Sin sucursal"
      });
      setSelectBranch((prevState: any) => ({
        ...prevState,
        branch: result.data,
      }));
      setFields((prevState: any) => ({
        ...prevState,
        companyId: response.data[0].id,
        branchId: result.data[0].id,
        companyName: response.data[0].name,
        branchName: result.data[0].name,
      }));

    } catch (error) {

    }
  }

  useEffect(() => {
    fetch()
  }, [])




  useEffect(() => {
    if (administratorUpdate) {

    }
  }, [administratorUpdate])




  // Estado inicial para los campos del formulario
const [fields, setFields] = useState<any>({
    name: '',
    symbol: '',
    predetermined: false,
    companyId: null,
    branchId: null,
    companyName: '',
    branchName: '',
  })


  const createUnits = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: any = await APIs.cresteUnits(fields);
      // Mostrar alerta de éxito
      Swal.fire({
        icon: 'success',
        title: 'Unidad creada',
        text: response.message,
      });

      // const result: any = await APIs.getCompanies(userState.id);
      // dispatch(setCompanies(result.data));
      dispatch(modal(''));
      setFields({
        name: '',
        Symbol: '',
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

  const selectPredeterminada = (_: any) => {
    // const exist = selectBranch.branch.filter((x: any) => x.predeterminado_empresa == true)
    // if (exist.length > 0) {
    //   Swal.fire('Notificacion', 'Ya existe una empresa predeterminada para este almacen: ' + exist[0].empresa, 'info')
    //   return
    // }
    // setFields((prevState: any) => ({
    //   ...prevState,
    //   predetermined: !fields.predetermined
    // }));

  }





  const [selectCompany, setSelectCompany] = useState<any>({
    selectCompany: false,
    companies: []
  })

  const openSelectCompany = () => {
    setSelectCompany((prevState: any) => ({
      ...prevState,
      selectCompany: !prevState.selectCompany, // Close the dropdown on selection
    }));
  }

  const handleCompanyChange = async (company: any) => {
    setSelectCompany((prevState: any) => ({
      ...prevState,
      selectCompany: !prevState.selectCompany,
    }));
    setSelectBranch((prevState: any) => ({
      ...prevState,
      companyId: company.id,
      companyName: company.name,

    }));

    let data = {
      userId: userState.id,
      companyId: company.id
    }
    let response: any = await APIs.getBranch(data)
    response.data.unshift({
      id: 0,
      name: "Sin sucursal"
    });
    setSelectBranch((prevState: any) => ({
      ...prevState,
      branch: response.data, // Close the dropdown on selection
    }));

    setFields((prevState: any) => ({
      ...prevState,
      branchId: response.data[0].id,
      branchName: response.data[0].name,
    }));
  }

  const [selectBranch, setSelectBranch] = useState<any>({
    selectBranch: false,
    branch: []
  })

  const openSelectBranch = () => {
    setSelectBranch((prevState: any) => ({
      ...prevState,
      selectBranch: !prevState.selectBranch, // Close the dropdown on selection
    }));
  }

  const handleBranchChange = (branch: any) => {
    setSelectBranch((prevState: any) => ({
      ...prevState,
      selectBranch: !prevState.selectBranch
    }));

    setFields((prevState: any) => ({
      ...prevState,
      branchId: branch.id,
      branchName: branch.name,
    }));
  }


  return (
    <div className={`overlay__units_modal ${modalState === 'units_modal' ? 'active' : ''}`}>
      <div className={`popup__units_modal ${modalState === 'units_modal' ? 'active' : ''}`}>
        <div className='header__modal'>
          <a href="#" className="btn-cerrar-popup__units_modal" onClick={() => handleModalChange('')}>
            <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
          </a>
          <p className='title__modals'>Crear nueva unidad</p>
        </div>
        <form className='units_modal' onSubmit={createUnits}>
          <div className='units_modal_container'>
            <div className='row__one'>
              <div>
                <div className='select__container'>
                  <label className='label__general'>Empresa</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectCompany.selectCompany ? 'active' : ''}`} onClick={openSelectCompany}>
                      <p>{fields.companyId !== null ? selectCompany.companies.find((s: { id: number }) => s.id === fields.companyId)?.name : 'selecciona'}</p>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectCompany.selectCompany ? 'active' : ''}`}>
                      <ul className={`options ${selectCompany.selectCompany ? 'active' : ''}`} style={{ opacity: selectCompany.selectCompany ? '1' : '0' }}>
                        {selectCompany?.companies?.map((company: any) => (
                          <li key={company.id} onClick={() => handleCompanyChange(company)}>
                            {company.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='select__container'>
                  <label className='label__general'>Sucursal</label>
                  <div className='select-btn__general'>
                    <div className={`select-btn ${selectBranch.selectBranch ? 'active' : ''}`} onClick={openSelectBranch}>
                      <p>{fields.branchId !== null ? selectBranch.branch.find((s: { id: number }) => s.id === fields.branchId)?.name : 'selecciona'}</p>
                      <svg className='chevron__down' xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                    </div>
                    <div className={`content ${selectBranch.selectBranch ? 'active' : ''}`}>
                      <ul className={`options ${selectBranch.selectBranch ? 'active' : ''}`} style={{ opacity: selectBranch.selectBranch ? '1' : '0' }}>
                        {selectBranch?.branch?.map((branch: any) => (
                          <li key={branch.id} onClick={() => handleBranchChange(branch)}>
                            {branch.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='row__two'>
              <div>
                <label className='label__general'>Nombre</label>
                <input className='inputs__general' value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} placeholder='Nombre' type="text" />
              </div>
              <div>
                <label className='label__general'>Símbolo de unidad</label>
                <input className='inputs__general' value={fields.symbol} onChange={(e) => setFields({ ...fields, symbol: e.target.value })} placeholder='Símbolo' type="text" />
              </div>
              <div className=''>
                <label className='label__general'>Predeterminado</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={fields.predetermined} // Asignar el valor del estado al atributo 'checked'
                    onChange={(e) => { selectPredeterminada(e.target.checked); }}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className='row__three'>
              <div>
                <button className='btn__general-primary'>Crear nueva unidad</button>
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
};

export default ModalUnits;
