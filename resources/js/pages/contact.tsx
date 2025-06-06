import React from "react";

export default function Contacto() {
  return (
    <div className="min-h-screen bg-white p-6 font-sans">
      {/* Título */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 mb-8 text-center">
        BuscaFarma
      </h1>

      {/* Descripción */}
      <p className="text-base sm:text-lg text-gray-800 text-center mb-8 max-w-4xl mx-auto text-justify px-2">
        En esta página podrás ponerte en contacto con nosotros para resolver tus dudas, hacer sugerencias o recibir asistencia relacionada con el uso de la aplicación.
      </p>

      {/* Formulario de contacto */}
      <form className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md space-y-4 w-full">
        <div>
          <label className="block mb-1 text-green-800 font-medium">Nombre</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-green-800 font-medium">Apellidos</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-green-800 font-medium">Dirección</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-green-800 font-medium">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label className="block mb-1 text-green-800 font-medium">Número</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="bg-green-800 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
