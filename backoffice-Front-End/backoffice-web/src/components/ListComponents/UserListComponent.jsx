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
  const { users, startLoadingUsers } = useUsersStore();

  // CUANDO SE USE EL COMPONENTE, SE VA TRAER LA LISTA DE USUARIOS

  useEffect(() => {
    startLoadingUsers();
  }, []);

  function activeUser(event) {
    console.log(event.target);
    let checkbox = event.target;
    let tRow = event.target.closest("tr");
    if (checkbox.checked) {
      tRow.classList.add("table-active");
      return true;
    } else {
      tRow.classList.remove("table-active");
    }
  }

  function deleteUser() {
    console.log("delete");
  }

  console.log(users);

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
                            onChange={activeUser}
                            className="custom-checkbox"
                          />
                        </td>
                        <td>{user.username}</td>
                        <td>Status</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            style={{ color: "#000000" }}
                            onClick={() => navigate("/user/editUser")}
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
