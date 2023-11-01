import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function formValidations(data) {
  function validateField(value, fieldName, minLength, maxLength) {
    let errorMessage;
    if (fieldName === "Fecha" && data.isbussiness) {
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
    lastname,
    dni,
    phone,
    adress,
    bussinessname,
    cuit,
    isbussiness,
    startdate,
  } = data;
  if (
    !validateField(name, "Nombre", 1, 50) ||
    !validateField(lastname, "Apellido", 1, 50) ||
    !validateField(dni.toString(), "DNI", 7, 9) ||
    !validateField(phone.toString(), "teléfono", 10, 10) ||
    !validateField(adress, "dirección", 1, 50) ||
    (isbussiness &&
      !validateField(bussinessname, "Nombre de Empresa", 1, 50)) ||
    (isbussiness && !validateField(cuit.toString(), "CUIT", 10, 11)) ||
    (isbussiness && !validateField(startdate?.toString(), "Fecha", -1, 10))
  ) {
    // Falta la fecha
    return true;
  } else {
    return false;
  }
}
