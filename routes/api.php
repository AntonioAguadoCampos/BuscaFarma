
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ReservationController;

Route::get('/pharmacies', [PharmacyController::class, 'index']);
Route::post('/pharmacies/byPrice', [PharmacyController::class, 'byPrice']);
Route::post('/pharmacies/byLocation', [PharmacyController::class, 'byLocation']);
Route::get('/products', [ProductController::class, 'index']);
Route::post('/messages', [MessageController::class, 'create']);
Route::post('/reservation', [ReservationController::class, 'create']);
