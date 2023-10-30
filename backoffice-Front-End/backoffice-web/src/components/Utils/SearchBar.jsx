import React from 'react'

const SearchBar = ({rawList,setFilteredList,compareTag}) => {
    let searchText = "";
    let filteredList = [];
    
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
        <>
            <input 
            type="text"
            placeholder='Buscar'
            onChange={event=>handleSearchChange(event)}
            />
        </>
    )
}

export default SearchBar;
