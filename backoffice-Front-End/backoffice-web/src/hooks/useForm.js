import { useState } from "react";

export function useForm(formDTO) {
  const [form, setForm] = useState(formDTO)

  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  function clearForm() {
    setForm(formDTO)
  }

  function emptyValidation() {
    for (const key in form) {
      if (form[key].length === 0) {
        return false
      }
    }
    return true
  }

  return {
    // Atributos
    ...form,
    // Metodos
    handleInputChange,
    clearForm,
    emptyValidation
  }
}