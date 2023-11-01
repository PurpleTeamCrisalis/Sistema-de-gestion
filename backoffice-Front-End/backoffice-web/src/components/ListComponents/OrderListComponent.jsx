import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
// import { useFetch } from "../../hooks/useFetch";
import { useOrdersStore } from "../../hooks";
import { useAuthStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Swal from 'sweetalert2'
import HeaderComponent from '../HeaderComponent';
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../assets/styles/AddRemoveButtonsStyle.css"

function OrderListComponent() {
  //   const { data } = useFetch("http://localhost:8080/user");
  const navigate = useNavigate();

  const { orders, startLoadingOrders, setActiveOrder, /*startDeletingUser,*/ activeUser } = useOrdersStore();
  const { user } = useAuthStore()


  // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS

  useEffect(() => {
    startLoadingOrders();
  }, []);


  function checkActiveOrder(event, user) {

    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveOrder(user);
        } else {
          tRow.classList.remove("table-active");
          setActiveOrder(null);
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  // function deleteUser() {
  //   if (activeUser) {
  //     if (activeUser.username != user.username) {
  //       if (activeUser.enabled === true) {
  //         Swal.fire({
  //           title: `¿Seguro que quieres eliminar a ${activeUser.username}?`,
  //           showCancelButton: true,
  //           confirmButtonText: 'confirmar',
  //           cancelButtonText: 'cancelar',
  //         }).then((result) => {
  //           /* Read more about isConfirmed, isDenied below */
  //           if (result.isConfirmed) {
  //             startDeletingUser();
  //             Swal.fire('Usuario Eliminado', '', 'success')
  //           }
  //         });
  //       } else {
  //         return Swal.fire({
  //           icon: "error",
  //           title: "Error",
  //           text: "No puede eliminar un usuario que esté deshabilitado",
  //         });
  //       }
  //     } else {
  //       return Swal.fire({
  //         icon: "error",
  //         title: "Error",
  //         text: "No puede eliminar el usuario con el que está logeado",
  //       });
  //     }

  //   } else {
  //     Toastify({
  //       text: "Seleccionar un usuario para eliminar",
  //       duration: 2000,
  //       style: {
  //         background: "linear-gradient(to right, #f44336, #b71c1c)",
  //       },
  //     }).showToast();
  //   }
  // }

  function showDetails(event, order) {
    alert("Mostrar modal con protuctos y sercicios");
    /*
    setActiveOrder(order);
    navigate("/user/editOrder");*/
  }

  
  function newOrder()
  {
    navigate("/order/newOrder");
  }

  return (
    <>
            <HeaderComponent/>
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="col-md-3 col-xl-10 bgGrey">
            {/* Button Section */}
            {/*<section className='d-flex justify-content-center m-3 gap-2'>
                <button type="button" className="btn fw-bold btn-lg bgAdd circle iconButton" onClick={()=>{}} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <FontAwesomeIcon className="gradientWhite" icon={faCirclePlus} color="white"/>
                </button>
                {/*<button type="button" className="btn fw-bold btn-lg bgRemove circle iconButton" onClick={deleteUser}>
                  <FontAwesomeIcon className="gradientWhite" icon={faTrash} color="white"/>
  </button>}
                <ScrollModalComponent list={orders}/>
            </section>*/}

            <section className='d-flex justify-content-center m-3 gap-2'>
                <button type="button" className="btn fw-bold btn-lg bgAdd circle iconButton" onClick={newOrder} >
                  <FontAwesomeIcon className="gradientWhite" icon={faCirclePlus} color="white"/>
                </button>
                {/*<ScrollModalComponent list={orders}/>*/}
            </section>

            
            {/* Table Section */}
            <section
              className="container shadow-lg p-0"
              style={{ maxHeight: '85vh', overflowY: 'auto' }}
            >
              <div className="bg-white rounded-3 overflow-hidden">
                <table className="table table-hover">
                  {/* Header de la table */}
                  <thead
                    style={{
                      position: "sticky",
                      top: 0,
                      borderBottom: "2px solid black",
                    }}
                  >
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Total</th>
                      <th scope="col">Fecha</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders?.map((order) => (
                      <tr key={order.id} style={{ marginBottom: '0px'}}>
                        <td>
                          <input
                            type="checkbox"
                            id={order.id}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onChange={(event) => checkActiveOrder(event, order)}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{order.client.id}</td>
                        <td>{order.total}</td>
                        <td>{order.date}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onClick={(event) => showDetails(event, order)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderListComponent;

    
    // import React, { useEffect, useState } from 'react'
    // import NavComponent from '../NavComponent'
    // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
    // import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
    // import HeaderComponent from '../HeaderComponent';

    // function OrderListComponent() {
    //     const [orders, setOrders] = useState([])

    //     // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE Pedidos
    //     useEffect(() => {
    //         console.log("Fetch de orders/pedidos")
    //     }, [])

    //     function newOrder() {
    //         console.log("new")
    //     }
    //     function editOrder(order) {
    //         console.log("edit")
    //     }
    //     function deleteOrder() {
    //         console.log("delete")
    //     }

    //     return (
    //         <>
    //             <HeaderComponent/>
    //             <div className="container-fluid">
    //                 <div className="row">
    //                     {/* Navbar */}
    //                     <NavComponent />

    //                     {/* Table and Buttons */}
    //                     <div className="col-md-9 col-xl-10 bgGrey ">
    //                         {/* Button Section */}
    //                         <section className='d-flex justify-content-center m-3'>
    //                             <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={newOrder}>Nuevo</button>
    //                             <button type="button" className="btn btn-primary mx-3 fw-bold btn-lg" onClick={deleteOrder}>Eliminar</button>
    //                         </section>

    //                         {/* Table Section */}
    //                         <section className='d-flex justify-content-center rounded-3'  style={{ maxHeight: '85vh', overflowY: 'auto' }}>
    //                             <table className="table table-primary">
    //                                 <thead style={{ position: 'sticky', top: 0, borderBottom: '2px solid black' }}>
    //                                     <tr>
    //                                         <th scope="col">#</th>
    //                                         <th scope="col">Item</th>
    //                                         <th scope="col">Fecha</th>
    //                                         <th scope="col">Monto Total</th>
    //                                         <th scope="col">Estado</th>
    //                                         <th scope="col">#</th>
    //                                     </tr>
    //                                 </thead>
    //                                 <tbody>
    //                                     {/* Acá se va a recorrer la lista de la entidad */}
    //                                     <tr className='table-primary'>
    //                                         <td>
    //                                             <input type="checkbox" className="custom-checkbox" />
    //                                         </td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td></td>
    //                                         <td>
    //                                             {/* Icono */}
    //                                             <FontAwesomeIcon
    //                                                 icon={faPenToSquare}
    //                                                 style={{ color: "#000000", }}
                                                    
    //                                             />
    //                                         </td>
    //                                     </tr>
    //                                 </tbody>
    //                             </table>
    //                         </section>
    //                     </div>
    //                 </div>
    //             </div >
    //         </>
    //     )
    // }

    // export default OrderListComponent;
