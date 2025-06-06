import React, { useState } from "react";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    fetch('api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!,
            },
            body: JSON.stringify({
                ...formulario,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .catch((error) => {
                console.error('Error al enviar la solicitud:', error);
            });
  };

  return (
  

    <div className="min-h-screen bg-white p-6 font-sans">
      {/* Header */}
      <a href="http://buscafarma.test">
        <header className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 mb-8 text-center">
            BuscaFarma
        </header>
      </a>

    {/* Descripción */}
    <p className="text-base sm:text-lg text-black text-center mb-8 max-w-2xl mx-auto text-justify">
      En esta página podrás ponerte en contacto con nosotros para resolver tus dudas, hacer sugerencias o recibir asistencia relacionada con el uso de la aplicación.
    </p>

    {/* Formulario */}
    <form
      onSubmit={manejarEnvio}
      className="max-w-xl mx-auto bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md space-y-4"
    >
      <div>
        <label className="block mb-1 text-green-800 font-medium">Nombre</label>
        <input
          type="text"
          name="name"
          value={formulario.name}
          onChange={manejarCambio}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>


      <div>
        <label className="block mb-1 text-green-800 font-medium">Dirección</label>
        <input
          type="text"
          name="address"
          value={formulario.address}
          onChange={manejarCambio}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      <div>
        <label className="block mb-1 text-green-800 font-medium">Email</label>
        <input
          type="email"
          name="email"
          value={formulario.email}
          onChange={manejarCambio}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      <div>
        <label className="block mb-1 text-green-800 font-medium">Número</label>
        <input
          type="number"
          name="phone"
          value={formulario.phone}
          onChange={manejarCambio}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
        />
      </div>

      <div className="text-center pt-4">
        <button
          type="submit"
          className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto"
        >
          Enviar
        </button>
      </div>
    </form>
  </div>
)};