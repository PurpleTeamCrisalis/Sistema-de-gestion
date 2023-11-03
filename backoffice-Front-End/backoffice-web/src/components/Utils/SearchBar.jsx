import React from 'react'

const SearchBar = ({rawList,setFilteredList,compareTag}) => {
    
    function handleSearchChange(e) {
        const searchText = e.target.value.toLowerCase();
        if (!searchText.trim()) {
            setFilteredList(rawList); // Restaurar la lista original cuando no hay búsqueda
        } else {
            const filteredList = rawList.filter(
            item => item[compareTag].toLowerCase().startsWith(searchText)
            );
            setFilteredList(filteredList); // Actualizar la lista filtrada
        }
    }
    
    return (
        <div className='d-flex width-100 justify-content-center p-2'>
            <input 
            type="text"
            placeholder='Buscar'
            onChange={event=>handleSearchChange(event)}
            style={{
                width: "400px",
                borderRadius: "5px"
            }}
            />
        </div>
    )
}

export default SearchBar;
