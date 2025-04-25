import React, { useEffect, useState } from 'react'
import ModalRequisition from './modal-requisition/ModalRequisition'
import { useDispatch } from 'react-redux';
import { modal } from '../../../../../redux/state/modals'
import APIs from '../../../../../services/APIs';
import { useSelector } from 'react-redux';
import './Requisition.css'
import Flatpickr from "react-flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

const Requisition: React.FC = () => {
  const userState = useSelector((store: any) => store.user);
  const dispatch = useDispatch();

  const handleModalChange = (value: any) => {
    dispatch(modal(value));
  };

  const [dates, setDates] = useState<any>([])
  const [tickets, setTickets] = useState<any>([])

  const [companies, setCompanies] = useState<any>([])
  const [branch, setBranch] = useState<any>([])

  const fetch = async () => {
    try {
      let response: any = await APIs.getCompanies(userState.id)
      let dataG = {
        companyId: response.data[0].id,
        branchId: 0
      }
      let tickets: any = await APIs.getTickets(dataG)

      setTickets(tickets.data)

      setCompanies(response.data)
      setSelectCompany((prevState: any) => ({
        ...prevState,
        companies: response.data,
      }));

      let data = {
        userId: userState.id,
        companyId: response.data[0].id
      }
      let result: any = await APIs.getBranch(data)
      setBranch(result.data)
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


  // Estado inicial para los campos del formulario
  const [fields, setFields] = useState<any>({
    companyId: null,
    branchId: null,
    companyName: '',
    branchName: '',
  })

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
      companyId: company.id,
      companyName: company.name,
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
    <div className='requisition'>
      <div className='requisition__container'>
        <div className='row__one'>
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
          <div>
            <label className="label__general">Desde</label>
            <div className="input-date">
              <Flatpickr
                className="date"
                options={{ locale: Spanish, dateFormat: "Y-m-d" }}
                value={dates?.startDate}
                onChange={(e) => setDates({ startDate: e[0]?.toISOString().split("T")[0] || "" })}
              />
            </div>
          </div>
          <div>
            <label className="label__general">Hasta</label>
            <div className="input-date">
              <Flatpickr
                className="date"
                options={{ locale: Spanish, dateFormat: "Y-m-d" }}
                value={dates?.endDate}
                onChange={(e) => setDates({ endDate: e[0]?.toISOString().split("T")[0] || "" })}
              />
            </div>
          </div>
        </div>
        <div className='row__two'>
          <div>
            <button className='btn__general-primary' onClick={() => handleModalChange('requisition_modal')}>Nueva Requisición</button>
          </div>
        </div>
        <div className='table__requisition' >
          <div>
            {tickets ? (
              <div className='table__numbers'>
                <p className='text'>Total de entradas</p>
                <div className='quantities_tables'>{tickets.length}</div>
              </div>
            ) : (
              <p className='text'>No hay empresas</p>
            )}
          </div>
          <div className='table__head'>
            <div className='thead'>
              <div className='th '>
                <p className=''>Serie / Folio</p>
              </div>
              <div className='th movil'>
                <p className=''>Fecha</p>
              </div>
              <div className='th movil'>
                <p className=''>Usuario</p>
              </div>
              <div className='th movil'>
                <p className=''>Empresa</p>
              </div>
              <div className='th movil'>
                <p className=''>Sucursal</p>
              </div>
              <div className='th'>
              </div>
              <div className='th'>
              </div>
            </div>
          </div>
          {tickets?.length > 0 ? (
            <div className='table__body'>
              {tickets?.map((item: any, index: any) => (
                <div className='tbody__container' key={index}>
                  <div className='tbody-desk'>
                    <div className='td'>
                      <p className='code-folio-identifier'>{item.serie}-{item.folio}</p>
                    </div>
                    <div className='td'>
                      <p className='date-identifier'>{item.createdAt}</p>
                    </div>
                    <div className='td'>
                      <p className='user-identifier'>{item.user}</p>
                    </div>
                    <div className='td movil'>
                      {item.companyName}
                    </div>
                    <div className='td movil'>
                      {item.branchName}
                    </div>
                    <div className='td edit'>
                      <div className='edit-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                      </div>
                    </div>
                    <div className='td delete'>
                      <div className='delete-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className=" icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className='tbody-response'>
                    <div className='td'>
                      <p className='code-folio-identifier'>{item.serie}-{item.folio}</p>
                    </div>
                    <div className='td'>
                      <p className='date-identifier'>{item.createdAt}</p>
                    </div>
                    <div className='td'>
                      <p className='user-identifier'>{item.user}</p>
                    </div>
                    <div className='td movil'>
                      {item.companyName}
                    </div>
                    <div className='td movil'>
                      {item.branchName}
                    </div>
                    <div className='td edit'>
                      <div className='edit-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-edit"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                      </div>
                    </div>
                    <div className='td delete'>
                      <div className='delete-icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className=" icon icon-tabler icons-tabler-filled icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M20 6a1 1 0 0 1 .117 1.993l-.117 .007h-.081l-.919 11a3 3 0 0 1 -2.824 2.995l-.176 .005h-8c-1.598 0 -2.904 -1.249 -2.992 -2.75l-.005 -.167l-.923 -11.083h-.08a1 1 0 0 1 -.117 -1.993l.117 -.007h16z" /><path d="M14 2a2 2 0 0 1 2 2a1 1 0 0 1 -1.993 .117l-.007 -.117h-4l-.007 .117a1 1 0 0 1 -1.993 -.117a2 2 0 0 1 1.85 -1.995l.15 -.005h4z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className='text'>No hay máximos y mínimos que mostrar</p>
          )}
        </div>
        <ModalRequisition companies={companies} branch={branch} />
      </div>
    </div>
  )
}

export default Requisition
