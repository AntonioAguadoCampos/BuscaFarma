<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use App\Models\Pharmacy;
use App\Models\Product;

class PharmacyController extends Controller
{

    public function index()
    {
        $farmacias = Pharmacy::all();
        return response()->json($farmacias);
    }
    
    public function byPrice(Request $request)
    {
        $productosMasBaratos = Product::with('pharmacy')
            ->whereIn('name', $request->productNames)
            ->whereIn('id', function ($query) {
                $query->selectRaw('MIN(p2.id)')
                    ->from('products as p2')
                    ->whereColumn('p2.name', 'products.name')
                    ->whereRaw('p2.price = (
                        SELECT MIN(p3.price)
                        FROM products p3
                        WHERE p3.name = p2.name
                    )');
            })
            ->get();

        return response()->json($productosMasBaratos);
    }

    public function byLocation(Request $request)
    {
        $productos = $request->input('productNames');
        $direccionUsuario = $request->input('direccion');

        // 1. Farmacias que tienen al menos uno de los productos
        $farmaciaIds = Product::whereIn('name', $productos)
            ->pluck('pharmacy_id')
            ->unique();

        // 2. Obtener farmacias y sus productos filtrados
        $farmacias = Pharmacy::whereIn('id', $farmaciaIds)
            ->with(['products' => function ($query) use ($productos) {
                $query->whereIn('name', $productos);
            }])
            ->get();

        // 3. Calcular distancia con Google Maps
        $googleKey = env('GOOGLE_MAPS_API_KEY');
        $resultados = [];

        foreach ($farmacias as $farmacia) {
            $response = Http::get('https://maps.googleapis.com/maps/api/distancematrix/json', [
                'origins' => $direccionUsuario,
                'destinations' => $farmacia->address,
                'key' => $googleKey,
            ]);

            $data = $response->json();
            $distancia = $data['rows'][0]['elements'][0]['distance']['value'] ?? null;

            $productosCoincidentes = $farmacia->products->map(function ($p) {
                return [
                    'name' => $p->name,
                    'price' => $p->price,
                    'id' => $p->id,
                ];
            });

            $resultados[] = [
                'farmacia' => $farmacia,
                'distancia_metros' => $distancia,
                'productos' => $productosCoincidentes,
            ];
        }

        // 4. Ordenar por distancia ascendente
        usort($resultados, fn($a, $b) => $a['distancia_metros'] <=> $b['distancia_metros']);

        return response()->json($resultados);
    }


}
