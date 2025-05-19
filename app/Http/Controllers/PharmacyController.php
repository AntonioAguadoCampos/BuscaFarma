<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Pharmacy;

class PharmacyController extends Controller
{
    public function index()
    {
        $farmacias = Pharmacy::all();
        return response()->json($farmacias);
    }
}
