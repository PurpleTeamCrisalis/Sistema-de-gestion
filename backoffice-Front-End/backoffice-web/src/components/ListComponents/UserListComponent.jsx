import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavComponent from "../NavComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { useFetch } from "../../hooks/useFetch";
import { useUsersStore } from "../../hooks";

function UserListComponent() {
  //   const { data } = useFetch("http://localhost:8080/user");
  const navigate = useNavigate();
  const { users, startLoadingUsers, setActiveUser, startDeletingUser } =
    useUsersStore();
  let userActive;

  // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS

  useEffect(() => {
    startLoadingUsers();
  }, []);

  function activeUser(event, user) {
    let checkboxes = document.getElementsByClassName("custom-checkbox");
    let checkbox = event.target;
    let tRow = checkbox.closest("tr");
    for (const item of checkboxes) {
      if (item.id == checkbox.id) {
        if (checkbox.checked) {
          tRow.classList.add("table-active");
          setActiveUser(user);
          userActive = checkbox;
        } else {
          tRow.classList.remove("table-active");
          setActiveUser(null);
          userActive = null;
        }
      } else {
        item.checked = false;
        item.closest("tr").classList.remove("table-active");
      }
    }
  }

  function deleteUser() {
    startDeletingUser();
  }

  function editUser(event, user) {
    setActiveUser(user);
    navigate("/user/editUser");
  }

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
                      <tr key={user.id}>
                        <td>
                          <input
                            type="checkbox"
                            id={user.id}
                            onChange={(event) => activeUser(event, user)}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{user.username}</td>
                        <td
                          style={{
                            color: user.enabled ? "green" : "red",
                          }}
                        >
                          {user?.enabled ? "habilitado" : "deshabilitado"}
                        </td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#000000" }}
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
