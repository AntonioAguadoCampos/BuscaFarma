import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export default function search() {
  const [busqueda, setBusqueda] = useState("");
  const [historial, setHistorial] = useState<string[]>([]);

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (busqueda.trim() !== "") {
      setHistorial([busqueda, ...historial]);
      setBusqueda("");
    }
  };

  const eliminarBusqueda = (indexAEliminar: number) => {
    const nuevoHistorial = historial.filter((_, i) => i !== indexAEliminar);
    setHistorial(nuevoHistorial);
  };

  return (
  <div className="min-h-screen bg-white p-6 sm:p-6 font-sans">
    {/* Título */}
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 mb-8 text-center">
      BuscaFarma
    </h1>

    {/* Descripción */}
    <p className="text-base sm:text-lg text-gray-800 text-center mb-8 max-w-4xl mx-auto text-justify px-2">
      En esta página podrás buscar productos farmacéuticos disponibles. Escribe el nombre del medicamento o producto que deseas encontrar y guarda tantas búsquedas como necesites.
    </p>

    {/* Formulario de búsqueda */}
    <form
      onSubmit={manejarEnvio}
      className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 mb-6"
    >
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar producto..."
        className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
      />
      <button
        type="submit"
        className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
      >
        Buscar
      </button>
    </form>

    {/* Historial de búsquedas */}
    <div className="max-w-xl mx-auto space-y-2">
      {historial.length > 0 && (
        <>
          <h2 className="text-green-800 text-lg sm:text-xl font-semibold mb-2">
            Medicamentos a buscar:
          </h2>
          {historial.map((item, index) => (
            <div
              key={index}
              className="p-3 bg-green-50 border border-green-200 rounded-md text-green-900 flex justify-between items-center"
            >
              <span className="break-words max-w-xs">{item}</span>
              <button
                onClick={() => eliminarBusqueda(index)}
                className="text-red-600 text-sm ml-4 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </>
      )}
    </div>

    {/* Botón final */}
    <div className="flex justify-center mt-8">
      <Button className="bg-green-800 text-white text-base sm:text-lg px-6 py-3 rounded-md hover:bg-green-700 transition-colors border border-green-800">
        <a href="http://buscafarma.test/searchResult">Realizar búsqueda</a>
      </Button>
    </div>
  </div>
);
}