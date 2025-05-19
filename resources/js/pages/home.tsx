import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const { auth } = usePage<SharedData>().props;
    const [farmacias, setFarmacias] = useState([]);
    const [loading, setLoading] = useState(true); // Para mostrar un indicador de carga

    useEffect(() => {
        fetch('/api/pharmacies')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error al obtener las farmacias');
                }
                return response.json();
            })
            .then((data) => {
                setFarmacias(data); // Guardar las farmacias en el estado
                setLoading(false); // Dejar de mostrar el cargando
            })
            .catch((error) => {
                console.error('Hubo un error:', error);
                setLoading(false); // Dejar de mostrar el cargando
            });
    }, []);

    if (loading) {
        return <div>Cargando farmacias...</div>; // Puedes personalizar el mensaje de carga
    }

    return (
        <div>
            <h1>Farmacias</h1>
            <ul>
                {farmacias.map((farmacia: any) => (
                    <li key={farmacia.id}>
                        {farmacia.nombre} - {farmacia.direccion}
                    </li>
                ))}
            </ul>
        </div>
    );
}