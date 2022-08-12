import React, { useState } from "react";
import "./Search.css"

export default function SearchBar({ onSearch }) {
  // estado para guardar lo que se escribe
  const [texto, setTexto] = useState("");
  // en tiempo real vamos a tomar el valor del input
  const handleChange = (evento) => {
    setTexto(evento.target.value);
  };
  // en el submit, vamos a enviarle a onSearch lo que se haya escrito en el input (Estado)
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(texto);
      }}
    >
      <input
      className="input"
        type="text"
        placeholder="Ciudad..."
        onChange={(evento) => handleChange(evento)}
      />

      <input type="submit" value="Agregar" className="btn"/>
    </form>
  );
}

//
