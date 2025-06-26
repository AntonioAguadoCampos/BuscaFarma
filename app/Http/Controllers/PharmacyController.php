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
        $productNames = $request->input('productNames', []);

    if (empty($productNames)) {
        return response()->json(['error' => 'No product names provided'], 400);
    }

    // Paso 1: obtener todos los productos con sus farmacias
    $products = Product::whereIn('name', $productNames)
        ->with('pharmacy')
        ->get();

    // Paso 2: inicializar productos restantes y resultados
    $remainingNames = collect($productNames);
    $assignedPharmacies = collect();

    while ($remainingNames->isNotEmpty()) {
        $candidates = $products->filter(fn($p) => $remainingNames->contains($p->name));

        // Agrupar por farmacia
        $grouped = $candidates->groupBy('pharmacy_id')->map(function ($items) {
            return [
                'pharmacy' => $items->first()->pharmacy,
                'products' => $items,
                'matchCount' => $items->count(),
                'totalPrice' => $items->sum('price'),
            ];
        });

        if ($grouped->isEmpty()) break;

        // Buscar farmacias con más coincidencias
        $maxMatch = $grouped->max('matchCount');
        $bestMatches = $grouped->filter(fn($g) => $g['matchCount'] === $maxMatch);

        // Elegir la más barata de las mejores
        $bestPharmacy = $bestMatches->sortBy('totalPrice')->first();
        $assignedNames = $bestPharmacy['products']->pluck('name')->unique();

        // Agregar al resultado
        $pharmacyData = $bestPharmacy['pharmacy']->toArray();
        $pharmacyData['products'] = $bestPharmacy['products']->map(fn($p) => [
            'id' => $p->id,
            'name' => $p->name,
            'price' => $p->price,
        ])->values();

        $assignedPharmacies->push($pharmacyData);

        // Eliminar esos productos del listado restante
        $remainingNames = $remainingNames->reject(fn($name) => $assignedNames->contains($name));
        }

        return response()->json($assignedPharmacies->values());
    }

    public function byLocation(Request $request)
    {
        $productos = $request->input('productNames');
        $direccionUsuario = $request->input('direccion');

        $farmaciaIds = Product::whereIn('name', $productos)
            ->pluck('pharmacy_id')
            ->unique();

        $farmacias = Pharmacy::whereIn('id', $farmaciaIds)
            ->with(['products' => function ($query) use ($productos) {
                $query->whereIn('name', $productos);
            }])
            ->get();

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

        usort($resultados, fn($a, $b) => $a['distancia_metros'] <=> $b['distancia_metros']);

        return response()->json($resultados);
    }

    public function recent()
    {
        $latestProducts = Pharmacy::latest()->take(3)->get();

        return response()->json($latestProducts);
    }


}
