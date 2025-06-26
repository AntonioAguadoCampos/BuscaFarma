/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import Select from 'react-select';

export default function BuscaFarma() {
    const [farmacias, setFarmacias] = useState<any[]>([]);
    const [originalProducts, setOriginalProducts] = useState<any[]>([]);
    const [productos, setProductos] = useState<any[]>([]);
    const [categorias, setCategorias] = useState<any[]>([]);
    const [historial, setHistorial] = useState<string[]>([]);
    const [categoriasFiltradas, setCategoriasFiltradas] = useState<string[]>([]);
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [recentFarmacias, setRecentFarmacias] = useState<any[]>([]);
    const [recentProducts, setRecentProducts] = useState<any[]>([]);

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    useEffect(() => {
        getProducts();
        getLocation();
        getRecentPharmacies();
        getRecentProducts();
    }, []);

    const getProducts = async () => {
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setOriginalProducts(data);
            setProductos(data.map((p: any) => ({ label: p.name, value: p.name })));
            setCategorias(data.map((c: any) => ({ label: c.category, value: c.category })));
        } catch (error) {
            console.error('Error al obtener los nombres de productos:', error);
        }
    };

    const getRecentPharmacies = async () => {
        try {
            const response = await fetch('/api/pharmacies/recents');
            const data = await response.json();
            setRecentFarmacias(data);
        } catch (error) {
            console.error('Error al obtener los nombres de productos:', error);
        }
    };

    const getRecentProducts = async () => {
        try {
            const response = await fetch('/api/products/recents');
            const data = await response.json();
            setRecentProducts(data);
        } catch (error) {
            console.error('Error al obtener los nombres de productos:', error);
        }
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;

            const apiKey = 'AIzaSyBMXNFfipjMMe1z4T6q1bjnzb4iMT4-O0M';
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

            try {
                const res = await fetch(url);
                const data = await res.json();

                if (data.status === 'OK') {
                    const formatted = data.results[0]?.formatted_address;
                    setAddress(formatted || 'Dirección no encontrada');
                }
            } catch (err: any) {
                //
            }
        });
    };

    const filterByPrice = () =>
        fetch('api/pharmacies/byPrice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ productNames: historial }),
        })
            .then((res) => res.json())
            .then((data) => {
                setFarmacias(data);
            });

    const filterByLocation = () =>
        fetch('api/pharmacies/byLocation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                productNames: historial,
                direccion: address,
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

    const filterProducts = (option: any) => {
        const product = originalProducts.find((p) => p.name === option.value);
        if (categoriasFiltradas.length > 0) {
            return (
                inputValue.length >= 3 &&
                option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
                categoriasFiltradas.includes(product.category)
            );
        }
        return inputValue.length >= 3 && option.label.toLowerCase().includes(inputValue.toLowerCase());
    };

    const addToCart = (farmacia: any) => {
        farmacia.reserved = !farmacia.reserved;
        setFarmacias([...farmacias]);
    };

    const makeReservation = () => {
        fetch('api/reservation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({ farmacias: farmacias.filter((farmacia) => farmacia.reserved), email }),
        }).then((res) => res.json());
    };

    return (
        <div className="flex min-h-screen flex-col bg-white p-6 font-sans">
            <main className="flex-grow p-6 sm:p-6">
                <header className="xl:text-10xl mb-10 text-center text-4xl font-bold text-green-700 sm:text-7xl md:text-8xl lg:text-9xl">
                    BuscaFarma
                    {inputValue}
                </header>
                <div className="flex justify-center px-4">
                    <Card className="flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-lg md:flex-row">
                        <div className="flex items-center justify-center bg-white p-4 md:w-1/2">
                            <img src="logo1.jpeg" alt="BuscaFarma" className="h-100 w-auto object-contain" />
                        </div>

                        <CardContent className="flex items-center justify-center p-2 md:w-1/2">
                            <div>
                                <p className="pr-4 text-center text-2xl text-green-900 md:text-justify">
                                    BuscaFarma es una aplicación diseñada para ayudarte a encontrar medicamentos disponibles en farmacias cercanas de
                                    forma rápida y confiable.
                                </p>
                                <ul className="mt-4 list-disc pr-4 pl-6 text-left text-base text-lg text-emerald-700">
                                    <li>Facilitamos a los farmacéuticos el dar a conocer los productos con los que trabajan</li>
                                    <li>
                                        A los compradores les proporcionamos la información de las farmacias que trabajan el medicamento que necesitan
                                    </li>
                                </ul>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Buscador integrado */}
                <div className="mx-auto mb-12 max-w-4xl space-y-4 pt-8">
                    {productos && (
                        <div>
                            <h2 className="mb-2 text-xl font-semibold text-green-800">Selecciona medicamentos a buscar:</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <Select
                                    options={productos}
                                    onInputChange={(value) => setInputValue(value)}
                                    filterOption={(option) => filterProducts(option)}
                                    noOptionsMessage={() => (inputValue.length < 3 ? 'Escribe al menos 3 letras...' : 'No hay coincidencias')}
                                    isMulti
                                    value={historial.map((h) => ({ label: h, value: h }))}
                                    onChange={(selectedOptions) => setHistorial(selectedOptions.map((option) => option.value))}
                                    placeholder="Buscar y seleccionar productos..."
                                />
                                <Select
                                    options={categorias}
                                    isMulti
                                    value={categoriasFiltradas.map((h) => ({ label: h, value: h }))}
                                    onChange={(selectedOptions) => setCategoriasFiltradas(selectedOptions.map((option) => option.value))}
                                    placeholder="Buscar y seleccionar categorias..."
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-6 flex flex-wrap justify-center gap-6">
                        <Button
                            onClick={filterByPrice}
                            disabled={!historial || historial.length === 0}
                            className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-white hover:bg-green-700"
                        >
                            Búsqueda por precio
                        </Button>
                        <Button
                            onClick={filterByLocation}
                            disabled={!historial || historial.length === 0}
                            className="rounded-md border border-green-800 bg-green-800 px-6 py-3 text-white hover:bg-green-700"
                        >
                            Búsqueda por distancia
                        </Button>
                    </div>

                    {farmacias.length > 0 && (
                        <div className="mt-8">
                            <h2 className="mb-4 text-2xl font-bold">Farmacias encontradas</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {farmacias.map((farmacia) => (
                                    <div key={farmacia.id} className="rounded-xl bg-white p-4 shadow">
                                        <img
                                            src={`/storage/${farmacia.image}`}
                                            alt={farmacia.name}
                                            className="mb-4 h-40 w-full rounded-md object-cover"
                                        />
                                        <h3 className="text-xl font-semibold">{farmacia.name}</h3>
                                        <p className="text-gray-600">{farmacia.address}</p>
                                        <p className="text-sm text-gray-500">📞 {farmacia.phone}</p>
                                        <p className="text-sm text-gray-500">📧 {farmacia.email}</p>
                                        {farmacia.products?.length > 0 && (
                                            <div className="relative mt-2 rounded-md bg-gray-100 p-4 pt-8">
                                                <button
                                                    className="absolute top-2 right-2 rounded-full bg-green-600 px-3 py-1 text-lg text-white shadow transition hover:bg-green-700"
                                                    title="Agregar producto"
                                                    onClick={() => addToCart(farmacia)}
                                                >
                                                    {farmacia.reserved ? '-' : '+'}
                                                </button>
                                                <p className="mb-2 text-sm font-semibold">Productos:</p>
                                                <ul className="list-inside list-disc text-sm text-gray-700">
                                                    {farmacia.products.map((product: any) => (
                                                        <li key={product.id}>{product.name}</li>
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
                {farmacias.find((farmacia) => farmacia.reserved) && (
                    <div className="flex items-center gap-2">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Introduce tu email"
                            className="w-full max-w-xs rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <Button
                            onClick={makeReservation}
                            disabled={!email || !isValidEmail(email)}
                            className="border border-green-800 px-4 py-2 text-sm text-green-800 hover:bg-green-100 sm:px-5 sm:py-3 sm:text-base md:px-6 md:py-4 md:text-lg"
                            variant="outline"
                        >
                            Hacer reserva
                        </Button>
                    </div>
                )}

                {/* Video */}
                <div className="mx-auto my-12 max-w-5xl px-4">
                    <video className="w-full rounded-xl shadow-lg" controls autoPlay muted loop>
                        <source src="videos/prueba.mp4" type="video/mp4" />
                        Tu navegador no soporta la reproducción de vídeo.
                    </video>
                </div>

                <nav className="mt-22 mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12 md:gap-20 lg:gap-36">
                    <Button
                        className="border-green-800 px-10 py-6 text-lg text-green-800 hover:bg-green-100 sm:px-12 sm:py-10 sm:text-3xl md:px-16 md:py-16 md:text-5xl"
                        variant="outline"
                    >
                        <a href="http://buscafarma.test/contact">Formulario nuevas farmacias</a>
                    </Button>
                </nav>
                {recentFarmacias.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-2xl font-bold">Últimas farmacias añadidas</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentFarmacias.map((farmacia) => (
                                <div key={farmacia.id} className="rounded-xl bg-white p-4 shadow">
                                    <h3 className="text-xl font-semibold">{farmacia.name}</h3>
                                    <p className="text-gray-600">{farmacia.address}</p>
                                    <p className="text-sm text-gray-500">📞 {farmacia.phone}</p>
                                    <p className="text-sm text-gray-500">📧 {farmacia.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {recentProducts.length > 0 && (
                    <div className="mt-8">
                        <h2 className="mb-4 text-2xl font-bold">Últimos productos añadidos</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {recentProducts.map((product) => (
                                <div key={product.id} className="rounded-xl bg-white p-4 shadow">
                                    <h3 className="text-xl font-semibold">{product.name}</h3>
                                    <p className="text-gray-600">{product.description}</p>
                                    <p className="text-sm text-gray-500">🏥 {product.pharmacy.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <footer className="mt-auto w-full bg-green-700 py-6 text-white">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
                    <span className="text-xl font-bold">BuscaFarma ©</span>
                    <div className="flex flex-col text-center text-base sm:flex-row sm:space-x-6 sm:text-left sm:text-xl">
                        <span role="img" aria-label="teléfono">
                            📞 666 000 000
                        </span>
                        <span role="img" aria-label="carta">
                            ✉️ buscafarma@gmail.com
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
