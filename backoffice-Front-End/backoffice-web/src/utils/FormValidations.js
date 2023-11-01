import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function formValidations(data) {
  function validateField(value, fieldName, minLength, maxLength) {
    let errorMessage;
    if (fieldName === "Fecha" && data.isBussiness) {
      if (value.length === 0) {
        Toastify({
          text: "Ingrese una fecha",
          duration: 2000,
          style: {
            background: "linear-gradient(to right, #f44336, #b71c1c)",
          },
        }).showToast();
        return false;
      }
    }

    if (value?.length < minLength || value?.length > maxLength) {
      errorMessage = `Error: ${fieldName} debe tener entre ${minLength} y ${maxLength} caracteres`;
      Toastify({
        text: errorMessage,
        duration: 2000,
        style: {
          background: "linear-gradient(to right, #f44336, #b71c1c)",
        },
      }).showToast();
      return false;
    }
    return true;
  }

  const {
    name,
    lastName,
    dni,
    phone,
    adress,
    bussinessName,
    cuit,
    isBussiness,
    StartDate,
  } = data;

  if (
    !validateField(name, "Nombre", 5, 50) ||
    !validateField(lastName, "Apellido", 5, 50) ||
    !validateField(dni.toString(), "DNI", 7, 9) ||
    !validateField(phone.toString(), "teléfono", 10, 10) ||
    !validateField(adress, "dirección", 5, 100) ||
    !validateField(StartDate?.toString(), "Fecha", -1, 10) ||
    (isBussiness &&
      !validateField(bussinessName, "Nombre de Empresa", 2, 100)) ||
    (isBussiness && !validateField(cuit.toString(), "CUIT", 10, 11))
  ) {
    return true;
  } else {
    return false;
  }
}
