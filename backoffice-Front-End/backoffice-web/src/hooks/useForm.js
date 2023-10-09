import { useState } from "react";

export function useForm(formDTO) {
  const [form, setForm] = useState(formDTO)

  function handleInputChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    })
  }

  return {
    // Atributos
    ...form,
    // Metodos
    handleInputChange
  }
}