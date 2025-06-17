<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Mail\ReservationMail;
use App\Models\Reservation;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ReservationController extends Controller
{
    public function create(Request $request)
    {
        $pharmacies = $request->input('farmacias');
        $email = $request->input('email');
        foreach ($pharmacies as $pharmacy) {
            $products = Product::whereIn('name', $pharmacy['products'])->get();
            $reservation = Reservation::create([
                'pharmacy_id' => $pharmacy['id'],
                'email' => $email,
            ]);
            $productsIds = $products->pluck('id')->toArray();
            $reservation->products()->attach($productsIds);    
        }
        
        return response()->json(['message' => 'Reservas guardadas correctamente']);
    }

    public static function acceptReservation($record)
    {
        Reservation::where('id', $record->id)->update(['status' => 'approved']);
        Mail::to($record->email)->send(new ReservationMail('approved'));
        return true;
    }

    public static function denyReservation($record)
    {
        Reservation::where('id', $record->id)->update(['status' => 'rejected']);
        Mail::to($record->email)->send(new ReservationMail('rejected'));
        return true;
    }

}
