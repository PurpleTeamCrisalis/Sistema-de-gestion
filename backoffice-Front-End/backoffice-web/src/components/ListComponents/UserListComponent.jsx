import React, { useEffect, useState } from "react";
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
import SearchBar from "../Utils/SearchBar";

function UserListComponent() {
  //   const { data } = useFetch("http://localhost:8080/user");
  const navigate = useNavigate();

  const { users, startLoadingUsers, setActiveUser, startDeletingUser, activeUser } = useUsersStore();
  const { user } = useAuthStore()

  const [filteredList, setFilteredList] = useState(users);

  


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
console.log(filteredList)
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          {/* Navbar */}
          <NavComponent />

          {/* Table and Buttons */}
          <div className="col-md-9 col-xl-10">
            {/* Button Section */}
            <section className="d-flex justify-content-center m-4">
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={() => navigate("/user/newUser")}
              >
                Nuevo
              </button>
              <button
                type="button"
                className="btn btn-primary mx-3 fw-bold btn-lg"
                onClick={deleteUser}
              >
                Eliminar
              </button>
            </section>

            {/* Table Section */}
            <section
              className="container bg-primary rounded-3 px-5 pt-4"
              style={{ minHeight: "75vh", width: "90%" }}
            >
              <SearchBar rawList={users} setFilteredList={setFilteredList} compareTag="username"/>
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
                    {filteredList?.map((user) => (
                      <tr key={user.id}>
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
