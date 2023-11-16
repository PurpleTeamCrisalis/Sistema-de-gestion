import React, { useEffect, useState } from "react";
import NavComponent from './NavComponent'
import { useForm, useUsersStore, useAuthStore } from "../hooks";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import "../assets/styles/inputStyle.css"
import HeaderComponent from "./HeaderComponent";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";


function UserProfileComponent() {
    const { startUpdatingUser, activeUser, setActiveUser, users } = useUsersStore();
    const { username, email, enabled, handleInputChange, emptyValidation } = useForm({
        username: activeUser?.username,
        email: activeUser?.email,
        enabled: activeUser?.enabled,
    });
    const { user, changeAuthUsername } = useAuthStore()

    const [userProfileImageExist, setUserProfileImageExist] = useState(true)

    useEffect(() => {
        const imageElement = document.getElementById('userProfileImage');
        axios.get(`http://localhost:8080/image/${activeUser.id}`)
            .then(function (response) {
                if (!response.data) return setUserProfileImageExist(false);
                if (response.data) return imageElement.src = `http://localhost:8080/image/${activeUser.id}`
            })


    }, []);

    async function updatedUserProfileImage(event) {
        event.preventDefault();
        const file = document.getElementById('file-input');
        const noImageElement = document.getElementById('userNoProfileImage');
        const form = new FormData();
        form.append('image', file.files[0]);

        if (noImageElement) {
            console.log("Entro para postear")
            setUserProfileImageExist(true);
            const imageElement = document.getElementById('userProfileImage');
            await axios.post(`http://localhost:8080/image/${activeUser.id}`, form);
            console.log(imageElement);

            //imageElement.src = `http://localhost:8080/image/${activeUser.id}`
        } else {
            console.log("Entro para update")
            const imageElement = document.getElementById('userProfileImage');
            await axios.patch(`http://localhost:8080/image/${activeUser.id}`, form);
            imageElement.src = `http://localhost:8080/image/${activeUser.id}`;
        }


    }

    function saveUserProfile() {

    }


    return (
        <div className="bgGrey">
            <HeaderComponent />
            <div className="container-fluid mainContainer">
                <div className="secondContainer">
                    {/* Navbar */}
                    <NavComponent />
                    {/* Imputs and Buttons */}
                    <div className="tablePane">
                        {/* Inputs */}
                        <section className="container bg-primary rounded-3 mt-5 mb-3" style={{ minHeight: "70vh", width: "90%" }}>
                            <div className="text-center pt-4">
                                <h3 className="fs-4 text-light">Perfil de Usuario</h3>
                                <hr className="bg-light" />
                            </div>
                            <div className="d-flex flex-column align-items-center" id="output">
                                {
                                    userProfileImageExist
                                        ? <img id="userProfileImage" alt="foto de perfil" width={"100px"} height={"100px"} />
                                        : <img id="userNoProfileImage" src="src\assets\images\user-no-image.png" alt="foto de perfil" width={"100px"} height={"100px"} />
                                }
                                <label for="file-input">
                                    <FontAwesomeIcon icon={faUpload} size="lg" className="mt-2" style={{ cursor: "pointer" }} />
                                </label>
                                <form id="form">
                                    <input type="file" id="file-input" onChange={(event) => updatedUserProfileImage(event)} style={{ display: "none" }} />
                                </form>
                            </div>
                            <div className="row justify-content-center align-items-center">
                                {/* Persona */}
                                <div className="col-sm-6">
                                    <div className="row m-4">
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="name" className="form-label">Nombre</label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={username}
                                                required
                                            />
                                        </div>
                                        {/* <div className="">
                                            <label htmlFor="password" className="form-label">Contraseña</label>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                onChange={handleInputChange}
                                                value={password}
                                                placeholder="Ingresar email"
                                                style={{ width: "350px", height: "50px" }}
                                            />
                                        </div> */}
                                        <div className="">
                                            <label htmlFor="description" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="form-control"
                                                onChange={handleInputChange}
                                                value={email}
                                                placeholder="Ingresar email"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="d-flex justify-content-center ">
                            <button
                                type="button"
                                className="btn btn-primary fw-bold btn-lg"
                                onClick={saveUserProfile}
                            >
                                Guardar
                            </button>
                        </section>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UserProfileComponent