<?php

namespace App\Http\Controllers;

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
}
