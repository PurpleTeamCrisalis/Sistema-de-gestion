import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export const ScrollModalComponent = ({list}) => {
  return (
    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body modal-dialog modal-dialog-scrollable">
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
                        {list?.map((user) => (
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
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={()=>{alert(1);}}>Understood</button>
                </div>
            </div>
        </div>
    </div>
  )
}
