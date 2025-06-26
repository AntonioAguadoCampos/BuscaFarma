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
    
}
