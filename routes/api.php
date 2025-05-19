
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PharmacyController;

Route::get('/pharmacies', [PharmacyController::class, 'index']);
