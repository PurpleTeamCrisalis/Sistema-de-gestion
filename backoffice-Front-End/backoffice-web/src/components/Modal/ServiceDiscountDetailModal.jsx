import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useServicesDiscountStore } from "../../hooks";
import { FaFilePdf } from "react-icons/fa6";


export const ServiceDiscountDetailModal = () => {
    const { activeServiceDiscount, startLoadingServicesDiscount, pullActiveServicesDiscount } = useServicesDiscountStore();

    return (
        <div
            className="modal fade"
            id="service-discount-detail-modal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-xl">
                <div className="modal-content">

                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            {`ID Cliente N°${activeServiceDiscount?.clientid}`}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={pullActiveServicesDiscount}
                        ></button>
                    </div>

                    <div className="bg-white rounded-3 overflow-hidden m-5">
                        <div className="row">
                            <div className="info-section col-md-4">
                                <strong className="fs-5">Información del Cliente</strong>
                                {activeServiceDiscount?.isbussiness ? (
                                    <ul>
                                        <li>
                                            <strong>Nombre de la Empresa: </strong>
                                            {activeServiceDiscount?.bussinessname}
                                        </li>
                                        <li>
                                            <strong>DNI/CUIT:</strong> {activeServiceDiscount?.cuit}
                                        </li>
                                        <li>
                                            <strong>Inicio de Actividades:</strong> {activeServiceDiscount?.startdate.split("T")[0]}
                                        </li>
                                    </ul>
                                )
                                    :
                                    (
                                        <ul>
                                            <li>
                                                <strong>Nombre: </strong>
                                                {`${activeServiceDiscount?.clientname} ${activeServiceDiscount?.lastname} `}
                                            </li>
                                            <li>
                                                <strong>DNI: </strong>{activeServiceDiscount?.dni}
                                            </li>
                                            <li>
                                                <strong>Teléfono: </strong> {activeServiceDiscount?.phone}
                                            </li>
                                            <li>
                                                <strong>Dirección: </strong> {activeServiceDiscount?.adress}
                                            </li>
                                        </ul>
                                    )
                                }

                            </div>

                            <div className="info-section col-md-4">
                                <strong className="fs-5">Información del Servicio</strong>
                                <ul>
                                    <li>
                                        <strong>Nombre del Servicio:</strong>{" "}
                                        {activeServiceDiscount?.servicename}
                                    </li>
                                    <li>
                                        <strong>Descripción:</strong>{" "}
                                        {activeServiceDiscount?.description}
                                    </li>
                                    <li>
                                        <strong>Precio Base:</strong>{" $"}
                                        {activeServiceDiscount?.baseprice?.toFixed(2)}
                                    </li>
                                    <li>
                                        <strong>Precio Soporte:</strong>{" $"}
                                        {activeServiceDiscount?.suportcharge?.toFixed(2)}
                                    </li>
                                </ul>
                            </div>

                            {activeServiceDiscount?.isbussiness ? (
                                <div className="info-section col-md-4">
                                    <strong className="fs-5">Información del Responsable</strong>
                                    <ul>
                                        <li>
                                            <strong>Nombre: </strong>
                                            {`${activeServiceDiscount?.clientname} ${activeServiceDiscount?.lastname} `}
                                        </li>
                                        <li>
                                            <strong>DNI: </strong>{activeServiceDiscount?.dni}
                                        </li>
                                        <li>
                                            <strong>Teléfono: </strong> {activeServiceDiscount?.phone}
                                        </li>
                                        <li>
                                            <strong>Dirección: </strong> {activeServiceDiscount?.adress}
                                        </li>
                                    </ul>
                                </div>
                            ) :
                                ("")
                            }
                        </div>
                    </div>

                    <div className="modal-footer d-flex justify-content-center">
                        <button type="button" className="border border-3 border-primary rounded">
                            <div className="m-1">
                                <label
                                    className="me-2"
                                    style={{
                                        color: "#000000",
                                        cursor: "pointer",
                                    }}
                                >
                                    Descargar
                                </label>
                                <FaFilePdf />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>

    );
};
