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
import '../assets/styles/userProfileImageStyle.css'
import { useNavigate } from "react-router-dom";


function UserProfileComponent() {
    const navigate = useNavigate();
    const { startUpdatingUser, activeUser, setActiveUser, users } = useUsersStore();
    const { user, changeAuthUsername } = useAuthStore();
    const { username, email, enabled, handleInputChange, emptyValidation } = useForm({
        username: activeUser?.username,
        email: activeUser?.email,
        enabled: activeUser?.enabled,
    });

    const [value, setValue] = useState();

    useEffect(() => {
        const imageElement = document.getElementById('userProfileImage');
        const noImageElement = document.getElementById('userNoProfileImage');
        const imageElementSmall = document.getElementById('userProfileImageSmall');
        const noImageElementSmall = document.getElementById('userNoProfileImageSmall');
        axios.get(`http://localhost:8080/image/${user.username}`)
            .then(function (response) {
                if (!response.data) return imageElement.src = `http://localhost:3000/image/hideme`;
                if (response.data) {
                    imageElement.src = `http://localhost:8080/image/${user.username}`;
                    noImageElement.src = "http://localhost:3000/image/hideme";
                    noImageElementSmall.src = "http://localhost:3000/image/hideme";
                    imageElementSmall.src = `http://localhost:8080/image/${user.username}`;
                    return;
                }
            })
    });

    function updatedUserProfileImage(event) {
        event.preventDefault();

        const imageElement = document.getElementById('userProfileImage');
        const noImageElement = document.getElementById('userNoProfileImage');
        const imageElementSmall = document.getElementById('userProfileImageSmall');
        const noImageElementSmall = document.getElementById('userNoProfileImageSmall');
        const file = document.getElementById('file-input');
        const form = new FormData();
        form.append('image', file.files[0]);

        if (imageElement.src === `http://localhost:8080/image/${user.username}`) {
            console.log("Entro update 1")
            const imageElement = document.getElementById('userProfileImage');
            axios.patch(`http://localhost:8080/image/${user.username}`, form)
                .then(function (response) {
                    if (response.data) {
                        imageElement.src = "http://localhost:3000/image/hideme";
                        imageElementSmall.src = "http://localhost:3000/image/hideme";
                        noImageElement.src = `http://localhost:8080/image/${user.username}`;
                        noImageElementSmall.src = `http://localhost:8080/image/${user.username}`;
                        return;
                    }
                });
            return;
        }
        if (noImageElement.src === `http://localhost:8080/image/${user.username}`) {
            console.log("Entro update 2")
            const imageElement = document.getElementById('userProfileImage');
            axios.patch(`http://localhost:8080/image/${user.username}`, form)
                .then(function (response) {
                    if (response.data) {
                        imageElement.src = `http://localhost:8080/image/${user.username}`;
                        imageElementSmall.src = `http://localhost:8080/image/${user.username}`;
                        noImageElement.src = "http://localhost:3000/image/hideme";
                        noImageElementSmall.src = "http://localhost:3000/image/hideme";
                        return;
                    }
                });
            return;
        }

        console.log("Entro para postear")
        axios.post(`http://localhost:8080/image/${user.username}`, form).then((response) => {
            imageElement.src = `http://localhost:8080/image/${user.username}`
            noImageElement.src = "http://localhost:3000/image/hideme";
            noImageElementSmall.src = "http://localhost:3000/image/hideme";
            imageElementSmall.src = `http://localhost:8080/image/${user.username}`;
        })
    }

    function saveUserProfile(event) {
        event.preventDefault();

        if (!emptyValidation()) {
            Toastify({
                text: "Hay campos vacíos",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: Campos vacíos");
        }

        if (username.length < 5) {
            Toastify({
                text: "Nombre de usuario debe ser mayor a 5 caracteres",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: Nombre de usuario menor a 5 caracteres");;
        }

        const usuarioExiste = users?.find(user => user.username === username);
        if ((usuarioExiste) && (activeUser.username !== username)) {
            Toastify({
                text: "Nombre de usuario ya existe",
                duration: 2000,
                style: {
                    background: "linear-gradient(to right, #f44336, #b71c1c)",
                },
            }).showToast();
            return console.error("Error: Nombre de usuario ya existe");
        }

        const userAux = {
            username,
            email,
            id: activeUser.id,
            enabled
        };

        const form = new FormData();
        form.append('newUserUsername', username);
        axios.patch(`http://localhost:8080/image/update/${user.username}`, form);

        if (activeUser.username !== user.username) {
            startUpdatingUser(userAux);
        } else {
            if (enabled !== "false") {
                startUpdatingUser(userAux);
                changeAuthUsername(userAux.username);
            } else {
                Toastify({
                    text: "No se puede deshabilitar el usuario con el que está logeado",
                    duration: 2000,
                    style: {
                        background: "linear-gradient(to right, #f44336, #b71c1c)",
                    },
                }).showToast();
                return console.error("Error: usuario logeado intentó auto-deshabilitarse");
            }
        }

        Toastify({
            text: "Usuario Actualizado",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
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
                                <img id="userProfileImage" alt="foto de perfil" width={"100px"} height={"100px"} />
                                <img id="userNoProfileImage" src="src\assets\images\user-no-image.png" alt="foto de perfil" width={"100px"} height={"100px"} />

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
                                                name="username"
                                                id="username"
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
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={(event)=>saveUserProfile(event)}
                            >
                                Guardar
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary mx-3 fw-bold btn-lg"
                                onClick={() => navigate("/")}
                            >
                                Volver
                            </button>
                        </section>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default UserProfileComponent