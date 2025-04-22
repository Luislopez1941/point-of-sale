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



  const handleModalChange = (value: any) => {
    dispatch(modal(value));

  };




  const [products, setProducts] = useState<any>([])
  const [productsSale, setProductsSale] = useState<any>([])


  const [searchTermLenghtCT, setSearchTermLenghtCT] = useState('');

  const [fields, setFields] = useState<any>({
    codigo: '',
    name: ''
  })


  const [loading, setLoading] = useState(false);

  const handleSearchCodeChange = async (code: string) => {

    if (code === fields.codigo) return;  // No hacer nada si el código no ha cambiado
    setFields((prev: any) => ({
      ...prev,
      codigo: code,
    }));
    setSearchTermLenghtCT(code)
    setLoading(true);  // Inicia el loading
    try {
      const response: any = await APIs.getProducts(code, '');
      console.log(response.data)
      setProducts(response.data || []);

    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);  // Termina el loading
    }
  };

  const handleSearchNameChange = async (name: string) => {
    if (name === fields.name) return;  // No hacer nada si el nombre no ha cambiado
    setFields((prev: any) => ({
      ...prev,
      name: name,
    }));
    setLoading(true);  // Inicia el loading
    try {
      const response: any = await APIs.getProducts('', name);
      setProducts(response.data || []);

    } catch (error) {
      console.error('Error al obtener los productos:', error);
    } finally {
      setLoading(false);  // Termina el loading
    }
  };


  const addProduct = (product: any) => {
    setProductsSale([...productsSale, product])
    setSearchTermLenghtCT('')
  }

  const [discount, setDiscount] = useState<any>(0)

  return (
    <div className={`overlay__sales-sheet_modal ${modalState === 'sales-sheet_modal' ? 'active' : ''}`}>
      <div className={`popup__sales-sheet_modal ${modalState === 'sales-sheet_modal' ? 'active' : ''}`}>

        <div className='sales-sheet_modal'>
          <div className='sales-sheet_modal_container'>
            <div className='header__modal'>
              <a href="#" className="btn-cerrar-popup__sales-sheet_modal" onClick={() => handleModalChange('')}>
                <svg className='svg__close' xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
              </a>
              <p className='title__modals'>Venta</p>
            </div>
            <div className='row__one'>
              <div className='search'>
                <div>
                  <div className='inputs__general_icons'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <input className='inputs__generic' placeholder='Codigo' value={fields.codigo} type="text" name="" onChange={(e) => handleSearchCodeChange(e.target.value)} />
                  </div>
                  <div className={`result__container_by_code ${searchTermLenghtCT.length > 0 ? 'active' : ''}`}>
                    <div>
                      {products.map((product: any) => (
                        <div className='row__one' onClick={() => addProduct(product)}>
                          <div className='item'>
                            <p >{product.name}</p>
                          </div>
                          <div className='item'>
                            <p>{product.code}</p>
                          </div>
                          <div className='image'>
                            <img src={`http://localhost:3000${product.photos[0].url}`} alt="product" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div className='inputs__general_icons'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
                    <input className='inputs__generic' placeholder='Nombre' type="text" value={fields.name} name="" onChange={(e) => handleSearchNameChange(e.target.value)} />
                  </div>
                </div>

              </div>
              <div className='additional'>
                <div className='btn__recharge'>
                  <button >Agregar recargar</button>
                </div>
                <div className='btn__services'>
                  <button >Pagos de servicios</button>
                </div>
              </div>
            </div>

            <div className='table_sales-sheet_modal' >
              <div>
                {productsSale ? (
                  <div className='table__numbers'>
                    <p className='text'>Total de productos</p>
                    <div className='quantities_tables'>{productsSale.length}</div>
                  </div>
                ) : (
                  <p className='text'>No hay empresas</p>
                )}
              </div>
              <div className='table__head'>
                <div className='thead'>
                  <div className='th '>
                    <p className=''>Codigo</p>
                  </div>
                  <div className='th movil'>
                    <p className=''>Nombre</p>
                  </div>
                  <div className='th movil'>
                    <p className=''>Cantidad</p>
                  </div>
                  <div className='th movil'>
                    <p className=''>Precio</p>
                  </div>
                  <div className='th movil'>
                    <p className=''>Foto</p>
                  </div>
                  <div className='th'>

                  </div>
                </div>
              </div>
              {productsSale?.length > 0 ? (
                <div className='table__body'>
                  {productsSale?.map((item: any, index: any) => (
                    <div className='tbody__container' key={index}>
                      <div className='tbody'>
                        <div className='td'>
                          <p className='code-identifier'>{item.code}</p>
                        </div>
                        <div className='td movil'>
                          <p className='name-identifier'>{item.name}</p>
                        </div>
                        <div className='td movil'>
                          <input className='inputs__general' type="text" placeholder='Cantidad' name="" id="" />
                        </div>
                        <div className='td movil'>
                          <p className='total-identifier'>{item?.precio}</p>
                        </div>
                        <div className='td image'>
                          <img src={`http://localhost:3000${item.photos[0].url}`} alt="product" />
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
            <div className='row__three'>
              <div className='subtotal'>
                <p className='title'>Subtotal</p>
                <p className='value'>$ 74.34</p>
              </div>
              <div className='discount'>
                <p className='title'>Descuento</p>
                <input className='value' value={discount} type="text" />
              </div>
              <div className='iva'>
                <p className='title'>Iva</p>
                <p className='value'>$ 78.82</p>
              </div>
              <div className='total'>
                <p className='title'>Total</p>
                <p className='value'>$ 567.23</p>
              </div>
            </div>
            <div className='row__four'>

              <div>
                <button className='btn__general-primary'>Cobrar y facturar</button>
              </div>
              <div>
                <button className='btn__add_debtor'>Agregar a deudores</button>
              </div>
              <div>
                <button className='btn__general-primary'>Cobrar</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalSheet;
