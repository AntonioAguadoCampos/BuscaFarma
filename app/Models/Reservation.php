<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $fillable = [
        'pharmacy_id',
        'status'
    ];

    public function pharmacy()
    {
        return $this->belongsTo(Pharmacy::class);
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_reservation');
    }
}
