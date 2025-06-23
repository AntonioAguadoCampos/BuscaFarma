<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'pharmacy_id',
        'category',
    ];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }

    public function reservations()
    {
        return $this->belongsToMany(Reservation::class, 'product_reservation');
    }
}
