import '../../assets/styles/AddRemoveButtonsStyle.css'
import '../../assets/styles/taxModal.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import SearchBar from '../Utils/SearchBar';
import { useChargesStore } from '../../hooks';
import React, { useEffect, useState } from 'react';
import { FaX } from "react-icons/fa6";

function TaxModal({ tax, setTax }) {
    const { charges, startLoadingCharges } = useChargesStore();
    const [filteredList, setFilteredList] = useState(charges);  

    // const [tax, setTax] = useState([]); //Guarda los impuestos seleccionados por id

    useEffect(()  => {
        if (tax.length > 0 ) CheckActive();
        if (charges.length === 0) startLoadingCharges();
         setFilteredList([...charges])
    }, [charges, tax]);

    function checkActiveCharge(event) {
        let checkboxes = document.getElementsByClassName("custom-checkbox");
        let checkbox = event.target;
        for (const item of checkboxes) {
            if (item.id === checkbox.id) {
                if (checkbox.checked) {
                    //Si esta vacio agregamos directamente el impuesto
                    if(tax.length == 0) setTax(prevTax => [...prevTax, charges.find(charge => charge.id == item.id && charge.id)]);
                    //Si la lista tiene datos guardados, verificamos que no tenga la misma id y agregamos la info que no tenemos
                    else if (!tax.some(charge => charge.id === item.id)) setTax(prevTax => [...prevTax, charges.find(charge => charge.id == item.id && charge.id)]);
                } else if (!checkbox.checked) {
                    //filtamos los impuestos por id
                    setTax(tax.filter((charge) => charge.id != item.id));
                }
            }
        }
        console.log(tax);
    }

    function deleteTax(event){
        let button = event.target;
        let checkboxes = document.getElementsByClassName("custom-checkbox");

        for (const item of checkboxes) {
            if (item.id === button.id) {
                item.checked = false;
                // Filtrar la lista tax para eliminar el elemento con el ID del botón
                setTax(tax.filter((charge) => charge.id != button.id));
            }
        }
    }

    function CheckActive(id){
        return tax.some(charge => charge.id === id)
    }
    


    return (
        <div className='divCharge'>
            <label htmlFor="impuesto" className="form-label">Impuesto</label>
            <button type="button" className="btn fw-bold btn-lg bgAdd circle ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <FontAwesomeIcon icon={faCirclePlus} color="white" />
            </button>
            <div className="mt-3 p-1 boxTax">
                {
                    tax.map((charge) => (
                        <div className='d-inline-flex align-items-center alert alert-primary p-1 m-sm-2' key={charge.id}>
                            <p className='d-inline m-sm-1 text-center'>{charge.name}</p>
                            <button onClick={(event)=>{deleteTax(event)}} className='btn p-1 h-25'>
                                <FaX id={charge.id}></FaX>
                            </button>
                        </div>
                    ))
                }
            </div>
            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2 className="fs-5" id="exampleModalLabel">Añadir Impuesto</h2>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column align-items-center" style={{height:"50vh"}}>
                            <SearchBar rawList={charges} setFilteredList={setFilteredList} compareTag={"name"} />
                            <div className='listTax scroll'>
                                {
                                    filteredList?.map((charge) => (
                                        <div key={charge.id} className='mt-1'>
                                            <input
                                                type="checkbox"
                                                id={charge.id}
                                                style={{
                                                    color: "#000000",
                                                    cursor: "pointer",
                                                }}
                                                checked = {CheckActive(charge.id)}
                                                onChange={(event) => checkActiveCharge(event)}
                                                className="custom-checkbox "
                                            />
                                            <label htmlFor="" className='ms-2'>{charge.name}</label>
                                        </div>
                                    ))
                                } 
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default TaxModal;