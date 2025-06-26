<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{

    public function index()
    {
        return response()->json(Product::all()); 
    }

    public function categories()
    {
        $categories = Product::select('category')
        ->distinct()
        ->orderBy('category')
        ->pluck('category');

        return response()->json($categories);
    }

    public function recent()
    {
        $products = Product::with('pharmacy:id,name')
            ->latest()
            ->take(3)
            ->get();

        return response()->json($products);
    }
    
}
