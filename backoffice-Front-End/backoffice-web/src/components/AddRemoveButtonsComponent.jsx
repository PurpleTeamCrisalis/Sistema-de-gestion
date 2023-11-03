import React from 'react'
import '../assets/styles/AddRemoveButtonsStyle.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";

function AddRemoveButtonsComponent(props) {
  return (
    <section className='d-flex justify-content-center m-3 gap-4'>
        <button type="button" className="btn fw-bold btn-lg bgAdd circle" onClick={props.newHandler}>
          <FontAwesomeIcon icon={faCirclePlus} color="white"/>
        </button>
        <button type="button" className="btn fw-bold btn-lg bgRemove circle" onClick={props.removeHandler}>
          <FontAwesomeIcon icon={faTrash} color="white"/>
        </button>
    </section>
  )
}

export default AddRemoveButtonsComponent