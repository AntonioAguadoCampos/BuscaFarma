<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;

class ProductController extends Controller
{

    public function index()
    {
        $nombres = Product::select('name')
        ->distinct()
        ->orderBy('name')
        ->pluck('name');

    return response()->json($nombres);
    }
    
}
