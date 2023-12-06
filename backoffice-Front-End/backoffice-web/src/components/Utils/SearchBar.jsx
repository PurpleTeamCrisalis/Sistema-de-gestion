import React, { useEffect } from "react";

const SearchBar = ({ rawList, setFilteredList, compareTag }) => {
  useEffect(() => {
    setFilteredList(rawList);
  }, [rawList]);

  function handleSearchChange(e) {
    const searchText = e.target.value.toLowerCase();
    if (!searchText.trim()) {
      setFilteredList(rawList); // Restaurar la lista original cuando no hay búsqueda
    } else {
      if (compareTag === "isbussiness") {
        const filteredList = rawList.filter((item) => {
          if (item[compareTag]) {
            return item["bussinessname"].toLowerCase().startsWith(searchText);
          } else {
            return item["name"].toLowerCase().startsWith(searchText);
          }
        });
        setFilteredList(filteredList);
      } else {
        const filteredList = rawList.filter((item) =>
          item[compareTag].toLowerCase().startsWith(searchText)
        );
        setFilteredList(filteredList); // Actualizar la lista filtrada
      }
    }
  }

  return (
    <div className="d-flex width-100 justify-content-center p-2">
      <input
        type="text"
        placeholder="Buscar"
        className="form-control"
        onChange={(event) => handleSearchChange(event)}
        style={{
          width: "400px",
          borderRadius: "5px",
        }}
      />
    </div>
  );
};

export default SearchBar;
