<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\ReservationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function mail(Request $request)
    {
        Mail::to('aac@prueba.com')->send(new ReservationMail());
        return response()->json(['mensaje' => 'Correo enviado']);
    }
}
