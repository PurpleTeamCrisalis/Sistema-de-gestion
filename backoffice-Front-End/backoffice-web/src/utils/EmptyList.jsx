import React from 'react';

function EmptyList(props) {
    return (
        <div className="text-center mt-5">
            <h3>Lista Vacía</h3>
            <h4 className='lead'>Agregue {props.name}</h4>
        </div>
    );
}

export default EmptyList;
