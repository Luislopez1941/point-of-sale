import React, { useEffect, useState } from 'react'
import './styles/Branch.css'
import { useDispatch, useSelector } from "react-redux";
import { setModal } from '../../../../../../../redux/state/store/Inventory';
import APIs from '../../../../../../../services/APIs';
import { setBranch } from '../../../../../../../redux/state/store/Inventory';

const Branch: React.FC = () => {

    const dispatch = useDispatch();
    const modalState = useSelector((state: any) => state.inventory.modal);
    const branchs = useSelector((state: any) => state.inventory.branch);
    const userState = useSelector((store: any) => store.user);

    const handleModalChange = (value: any) => {
        dispatch(setModal(value));
    };

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

    const addBranch = () => {
        let data = {
            branchId: fields.branchId,
            branchName: fields.branchName,
        }
        dispatch(setBranch([...branchs, data]))
    }

    console.log(branchs)

    return (
        <div className={`overlay__branch_modal-product ${modalState === 'branch_modal-product' ? 'active' : ''}`}>
            <div className={`popup__branch_modal-product ${modalState === 'branch_modal-product' ? 'active' : ''}`}>
                <div className='header__modal'>
                    <a href="#" className="btn-cerrar-popup__branch_modal-product" onClick={() => handleModalChange('')}>
                        <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                    </a>
                    <p className='title__modals'>Nuevo almacén</p>
                </div>
                <div className='branch_modal-product'>
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
                            <button className='btn__general-primary' onClick={addBranch}>Agregar</button>
                        </div>
                    </div>
                    <div className='table_store_modal-products' >
                        <div>
                            {branchs ? (
                                <div className='table__numbers'>
                                    <p className='text'>Total de almacenes</p>
                                    <div className='quantities_tables'>{branchs.length}</div>
                                </div>
                            ) : (
                                <p className='text'>No hay empresas</p>
                            )}
                        </div>
                        <div className='table__head'>
                            <div className='thead'>
                                <div className='th '>
                                    <p className=''>Nombre</p>
                                </div>
                                <div className='th movil'>
                                    <p className=''>Empresa</p>
                                </div>
                                <div className='th movil'>
                                    <p className=''>Sucursal</p>
                                </div>
                                <div className='th movil'>
                                    <p className=''>Estado</p>
                                </div>
                                <div className='th'>

                                </div>
                            </div>
                        </div>
                        {branchs?.length > 0 ? (
                            <div className='table__body'>
                                {branchs?.map((item: any, index: any) => (
                                    <div className='tbody__container' key={index}>
                                        <div className='tbody'>
                                            <div className='td'>
                                                {item.companyName}
                                            </div>
                                            <div className='td movil'>

                                                {item.branchName}
                                            </div>



                                            <div className='td'>
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

                </div>
            </div>
        </div>
    )
}

export default Branch
