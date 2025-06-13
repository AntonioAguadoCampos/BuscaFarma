import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Select from "react-select";

export default function BuscaFarma() {
  const [historial, setHistorial] = useState<string[]>([]);
  const [farmacias, setFarmacias] = useState<any[]>([]);
  const [productosDisponibles, setProductosDisponibles] = useState<any[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProductosDisponibles(data.map((name: string) => ({ label: name, value: name })));
    } catch (error) {
      console.error("Error al obtener los nombres de productos:", error);
    }
  };

  const filterByPrice = () =>
    fetch("api/pharmacies/byPrice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ productNames: historial }),
    })
      .then((res) => res.json())
      .then((data) => {
        const farmacias: any[] = [];
        for (const product of data) {
          const existPharmacy = farmacias.find((f) => f.id === product.pharmacy_id);
          if (existPharmacy) {
            existPharmacy.products.push(product.name);
          } else {
            const farmacia = product.pharmacy;
            farmacia.products = [product.name];
            farmacias.push(farmacia);
          }
        }
        setFarmacias(farmacias);
      });

  const filterByLocation = () =>
    fetch("api/pharmacies/byLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productNames: historial,
        direccion: "C. Juan de Quesada, 30, 35001 Las Palmas de Gran Canaria, Las Palmas",
      }),
    })
      .then((res) => res.json())
      .then((pharmacies) => {
        const farmacias: any[] = [];
        for (const product of historial) {
          for (const pharmacyReq of pharmacies) {
            const products: string[] = pharmacyReq.farmacia.products.map((product: any) => product.name);
            if (products.includes(product)) {
              const existPharmacy = farmacias.find((f) => f.id === pharmacyReq.farmacia.id);
              if (existPharmacy) {
                existPharmacy.products.push(product);
              } else {
                pharmacyReq.farmacia.products = [product];
                farmacias.push(pharmacyReq.farmacia);
              }
            }
          }
        }
        setFarmacias(farmacias);
      });

  return (
    <div className="flex flex-col min-h-screen bg-white p-6 font-sans">
      <main className="flex-grow p-6 sm:p-6">
        <header className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold text-green-700 mb-10 text-center">
          BuscaFarma
        </header>

        <div className="flex justify-center px-4">
          <Card className="flex flex-col md:flex-row max-w-4xl w-full shadow-lg rounded-2xl overflow-hidden">
            <div className="md:w-1/2 flex items-center justify-center bg-white p-4">
              <img src="logo1.jpeg" alt="BuscaFarma" className="h-100 w-auto object-contain" />
            </div>

            <CardContent className="p-2 flex items-center justify-center md:w-1/2">
              <div>
                <p className="text-2xl text-green-900 text-center md:text-justify pr-4">
                  BuscaFarma es una aplicación diseñada para ayudarte a encontrar medicamentos disponibles en farmacias cercanas de forma rápida y confiable.
                </p>
                <ul className="list-disc text-lg pl-6 pr-4 mt-4 text-base text-emerald-700 text-left">
                  <li>Facilitamos a los farmacéuticos el dar a conocer los productos con los que trabajan</li>
                  <li>A los compradores les proporcionamos la información de las farmacias que trabajan el medicamento que necesitan</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video */}
        <div className="max-w-5xl mx-auto my-12 px-4">
          <video className="w-full rounded-xl shadow-lg" controls autoPlay muted loop>
            <source src="videos/prueba.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de vídeo.
          </video>
        </div>

        {/* Buscador integrado */}
        <header className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-10xl font-bold text-green-700 mb-6 text-center">
          Búsqueda de medicamentos
        </header>

        <div className="mx-auto max-w-4xl space-y-4 mb-12">
          {productosDisponibles && (
            <div>
              <h2 className="mb-2 text-xl font-semibold text-green-800">Selecciona medicamentos a buscar:</h2>
              <Select
                options={productosDisponibles}
                isMulti
                value={historial.map((h) => ({ label: h, value: h }))}
                onChange={(selectedOptions) => setHistorial(selectedOptions.map((option) => option.value))}
                placeholder="Buscar y seleccionar productos..."
              />
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <Button onClick={filterByPrice} className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-white hover:bg-green-700">
              Búsqueda por precio
            </Button>
            <Button onClick={filterByLocation} className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-white hover:bg-green-700">
              Búsqueda por distancia
            </Button>
          </div>

          {farmacias.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Farmacias encontradas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {farmacias.map((farmacia) => (
                  <div key={farmacia.id} className="rounded-xl bg-white p-4 shadow">
                    <img src={`/storage/${farmacia.image}`} alt={farmacia.name} className="mb-4 h-40 w-full rounded-md object-cover" />
                    <h3 className="text-xl font-semibold">{farmacia.name}</h3>
                    <p className="text-gray-600">{farmacia.address}</p>
                    <p className="text-sm text-gray-500">📞 {farmacia.phone}</p>
                    <p className="text-sm text-gray-500">📧 {farmacia.email}</p>
                    {farmacia.products?.length > 0 && (
                      <div className="relative mt-2 rounded-md bg-gray-100 p-4 pt-8">
                        <button
                          className="absolute top-2 right-2 rounded-full bg-green-600 px-3 py-1 text-lg text-white shadow transition hover:bg-green-700"
                          title="Agregar producto"
                        >
                          +
                        </button>
                        <p className="mb-2 text-sm font-semibold">Productos:</p>
                        <ul className="list-inside list-disc text-sm text-gray-700">
                          {farmacia.products.map((product: string, idx: number) => (
                            <li key={idx}>{product}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <nav className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 md:gap-20 lg:gap-36 mt-22 mb-12">
          <Button className="text-lg sm:text-3xl md:text-5xl px-10 sm:px-12 md:px-16 py-6 sm:py-10 md:py-16 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/contact">Formulario nuevas farmacias</a>
          </Button>
          {/*
          <Button className="text-lg sm:text-xl md:text-2xl px-8 py-6 sm:py-10 md:py-12 text-green-800 border-green-800 hover:bg-green-100" variant="outline">
            <a href="http://buscafarma.test/search">Buscador de medicamentos</a>
          </Button>  
          */}
        </nav>
        
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