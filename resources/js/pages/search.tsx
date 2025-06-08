/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function search() {
    const [historial, setHistorial] = useState<string[]>([]);
    const [farmacias, setFarmacias] = useState<any[]>([]);
    const [productosDisponibles, setProductosDisponibles] = useState<any[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProductosDisponibles(data.map((name: string) => ({ label: name, value: name })));
        } catch (error) {
            console.error('Error al obtener los nombres de productos:', error);
        }
    };

    const filterByPrice = () =>
        fetch('api/pharmacies/byPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!,
            },
            body: JSON.stringify({
                productNames: historial,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
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
        fetch('api/pharmacies/byLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!,
            },
            body: JSON.stringify({
                productNames: historial,
                direccion: 'C. Juan de Quesada, 30, 35001 Las Palmas de Gran Canaria, Las Palmas',
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }
                return response.json();
            })
            .then((pharmacies) => {
                console.log(pharmacies);
                const farmacias: any[] = [];
                for (const product of historial) {
                    for (const pharmacyReq of pharmacies) {
                        const products: string[] = pharmacyReq.products.map((product: any) => product.name);
                        if (products.includes(product)) {
                            const existPharmacy = farmacias.find((f) => f.id === pharmacyReq.id);
                            if (existPharmacy) {
                                existPharmacy.products.push(product);
                            } else {
                                pharmacyReq.products = [product];
                                farmacias.push(pharmacyReq);
                            }
                        }
                    }
                }

                // setFarmacias(farmacias);
            });

    return (
        <div className="min-h-screen bg-white p-6 font-sans sm:p-6">
            {/* Título */}
            <a href="http://buscafarma.test">
                <h1 className="mb-8 text-center text-4xl font-bold text-green-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">BuscaFarma</h1>
            </a>

            {/* Descripción */}
            <p className="mx-auto mb-8 max-w-4xl px-2 text-center text-justify text-base text-gray-800 sm:text-lg">
                En esta página podrás buscar productos farmacéuticos disponibles. Escribe el nombre del medicamento o producto que deseas encontrar y
                guarda tantas búsquedas como necesites.
            </p>

            <div className="mx-auto max-w-xl space-y-4">
                {/* Selector de productos */}
                {productosDisponibles && (
                    <div>
                        <h2 className="mb-2 text-lg font-semibold text-green-800 sm:text-xl">Selecciona medicamentos a buscar:</h2>
                        <Select
                            options={productosDisponibles}
                            isMulti
                            value={historial.map((h) => ({ label: h, value: h }))}
                            onChange={(selectedOptions) => setHistorial(selectedOptions.map((option) => option.value))}
                            placeholder="Buscar y seleccionar productos..."
                            className="text-green-900"
                        />
                    </div>
                )}
            </div>

            {/* Botón final */}
            <div className="mt-8 flex flex-wrap justify-center gap-6">
                <Button
                    onClick={filterByPrice}
                    className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-base text-white transition-colors hover:bg-green-700 sm:text-lg"
                >
                    Búsqueda por precio
                </Button>
                <Button
                    onClick={filterByLocation}
                    className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-base text-white transition-colors hover:bg-green-700 sm:text-lg"
                >
                    Búsqueda por distancia
                </Button>
            </div>

            {farmacias && farmacias.length > 0 && (
                <div className="mx-auto max-w-5xl p-6">
                    <h1 className="mb-6 text-3xl font-bold">Farmacias</h1>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {farmacias.map((farmacia: any) => (
                            <div key={farmacia.id} className="rounded-xl bg-white p-4 shadow">
                                <img src={`/storage/${farmacia.image}`} alt={farmacia.name} className="mb-4 h-40 w-full rounded-md object-cover" />
                                <h2 className="text-xl font-semibold">{farmacia.name}</h2>
                                <p className="text-gray-600">{farmacia.address}</p>
                                <p className="text-sm text-gray-500">📞 {farmacia.phone}</p>
                                <p className="mb-2 text-sm text-gray-500">📧 {farmacia.email}</p>
                                {farmacia.products && farmacia.products.length > 0 && (
                                    <div className="relative mt-2 rounded-md bg-gray-100 p-4 pt-8">
                                        <button
                                            className="absolute top-2 right-2 rounded-full bg-green-600 px-3 py-1 text-lg text-white shadow transition hover:bg-green-700"
                                            title="Agregar producto"
                                        >
                                            +
                                        </button>

                                        <p className="mb-2 text-sm font-semibold">Productos:</p>
                                        <ul className="list-inside list-disc text-sm text-gray-700">
                                            {farmacia.products.map((product: string, index: number) => (
                                                <li key={index}>{product}</li>
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
    );
}
