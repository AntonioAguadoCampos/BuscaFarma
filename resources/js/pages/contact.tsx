import React, { useState } from "react";
import toast from "react-hot-toast";

export default function Contacto() {
  const [formulario, setFormulario] = useState({
    numcol: "",
    name: "",
    address: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errores, setErrores] = useState<string[]>([]);

  const [success, setSuccess] = useState<boolean>(false);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    const camposObligatorios: { [key: string]: string } = {
      numcol: "Número colegiado",
      name: "Nombre",
      address: "Dirección",
      email: "Email",
      phone: "Número",
      message: "Mensaje",
    };

    const camposFaltantes = Object.entries(camposObligatorios)
      .filter(([key]) => !formulario[key as keyof typeof formulario].trim())
      .map(([, label]) => label);

    if (camposFaltantes.length > 0) {
      setErrores(camposFaltantes);
      
      return;
    } else {
      setSuccess(true);
    }

    setErrores([]);

    fetch("api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-CSRF-TOKEN": document
          .querySelector('meta[name="csrf-token"]')!
          .getAttribute("content")!,
      },
      body: JSON.stringify(formulario),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error en la solicitud");
        return response.json();
      })
      .then(() => {
        setFormulario({
          numcol: "",
          name: "",
          address: "",
          email: "",
          phone: "",
          message: "",
        });
        
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        toast.error("Hubo un error al enviar el mensaje");
      });
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-white p-6 font-sans">
      <main className="flex-grow p-6 sm:p-6">
        <a href="http://buscafarma.test">
          <header className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-green-700 mb-8 text-center">
            BuscaFarma
          </header>
        </a>

        <p className="text-base sm:text-lg text-black text-center mb-8 max-w-2xl mx-auto text-justify">
          En esta página podrás ponerte en contacto con nosotros para dar de alta
          su farmacia en nuestra aplicación y así poder dar a conocer sus
          productos a la población.
        </p>

        {errores.length > 0 && (
          <div className="max-w-xl mx-auto mb-4 text-red-700 bg-red-100 border border-red-300 p-3 rounded-md">
            Faltan los siguientes campos por rellenar:{" "}
            <strong>{errores.join(", ")}</strong>
          </div>
        )}

        {success && (
          <div className="max-w-xl mx-auto mb-4 text-green-700 bg-green-100 border border-green-300 p-3 rounded-md">
            <strong>Mensaje enviado con éxito</strong>
          </div>
        )}

        <form
          onSubmit={manejarEnvio}
          className="max-w-xl mx-auto bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md space-y-4"
        >
          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Número colegiado
            </label>
            <input
              type="text"
              name="numcol"
              value={formulario.numcol}
              onChange={manejarCambio}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>

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
            <label className="block mb-1 text-green-800 font-medium">
              Dirección
            </label>
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
            <label className="block mb-1 text-green-800 font-medium">
              Teléfono
            </label>
            <input
              type="number"
              name="phone"
              value={formulario.phone}
              onChange={manejarCambio}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block mb-1 text-green-800 font-medium">
              Mensaje
            </label>
            <textarea
              name="message"
              rows={3}
              value={formulario.message}
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
      </main>
      <footer className="w-full bg-green-700 text-white py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xl font-bold">BuscaFarma ©</span>
          <div className="flex flex-col sm:flex-row sm:space-x-6 text-base sm:text-xl text-center sm:text-left">
              <span role="img" aria-label="teléfono">📞 666 000 000</span>
              <span role="img" aria-label="carta">✉️ buscafarma@gmail.com</span>
          </div>
          </div>
      </footer>
    </div>
  );
}