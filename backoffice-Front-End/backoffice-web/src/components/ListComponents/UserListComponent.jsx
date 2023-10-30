import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { useFetch } from "../../hooks/useFetch";
import { useUsersStore } from "../../hooks";
import { useAuthStore } from "../../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import Swal from 'sweetalert2'
import HeaderComponent from '../HeaderComponent';
import AddRemoveButtonsComponent from '../AddRemoveButtonsComponent';

function UserListComponent() {
  //   const { data } = useFetch("http://localhost:8080/user");
  const navigate = useNavigate();

  const { users, startLoadingUsers, setActiveUser, startDeletingUser, activeUser } = useUsersStore();
  const { user } = useAuthStore()


  // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS

  useEffect(() => {
    startLoadingUsers();
  }, []);


  function checkActiveUser(event, user) {

    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveUser(user);
        } else {
          tRow.classList.remove("table-active");
          setActiveUser(null);
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function deleteUser() {
    if (activeUser) {
      if (activeUser.username != user.username) {
        if (activeUser.enabled === true) {
          Swal.fire({
            title: `¿Seguro que quieres eliminar a ${activeUser.username}?`,
            showCancelButton: true,
            confirmButtonText: 'confirmar',
            cancelButtonText: 'cancelar',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              startDeletingUser();
              Swal.fire('Usuario Eliminado', '', 'success')
            }
          });
        } else {
          return Swal.fire({
            icon: "error",
            title: "Error",
            text: "No puede eliminar un usuario que esté deshabilitado",
          });
        }
      } else {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: "No puede eliminar el usuario con el que está logeado",
        });
      }

    } else {
      Toastify({
        text: "Seleccionar un usuario para eliminar",
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
    }
  }

  function editUser(event, user) {
    setActiveUser(user);
    navigate("/user/editUser");
  }

  function newUser()
  {
    navigate("/user/newUser");
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
            <AddRemoveButtonsComponent newHandler={newUser} removeHandler={deleteUser} name=""/>

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
                      <th scope="col">Nombre Usuario</th>
                      <th scope="col">Estado</th>
                      <th scope="col">#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((user) => (
                      <tr key={user.id} style={{ marginBottom: '0px'}}>
                        <td>
                          <input
                            type="checkbox"
                            id={user.id}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onChange={(event) => checkActiveUser(event, user)}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{user.username}</td>
                        <td>{user.enabled ? "habilitado" : "deshabilitado"}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{
                              color: "#000000",
                              cursor: "pointer",
                            }}
                            onClick={(event) => editUser(event, user)}
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

export default UserListComponent;
