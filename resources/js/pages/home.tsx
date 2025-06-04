/* eslint-disable @typescript-eslint/no-explicit-any */
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Home() {
    const [farmacias, setFarmacias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/pharmacies')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener las farmacias');
                }
                return response.json();
            })
            .then((data) => {
                setFarmacias(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Hubo un error:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Cargando farmacias...</div>;
    }

    return (
        <>
            <Head title="Listado de Farmacias" />
            <div className="mx-auto max-w-5xl p-6">
                <h1 className="mb-6 text-3xl font-bold">Farmacias</h1>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {farmacias.map((farmacia: any) => (
                        <div key={farmacia.id} className="rounded-xl bg-white p-4 shadow">
                            <img src={`/storage/${farmacia.image}`} alt={farmacia.name} className="mb-4 h-40 w-full rounded-md object-cover" />
                            <h2 className="text-xl font-semibold">{farmacia.name}</h2>
                            <p className="text-gray-600">{farmacia.address}</p>
                            <p className="text-sm text-gray-500">📞 {farmacia.phone}</p>
                            <p className="text-sm text-gray-500">📧 {farmacia.email}</p>
                        </div>
                    ))}
                </div>
            </div>
            <a href="http://buscafarma.test/contact">Vamos a contact</a>
        </>
    );
}
