
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PharmacyController;
use App\Http\Controllers\MessageController;

Route::get('/pharmacies', [PharmacyController::class, 'index']);
Route::post('/messages', [MessageController::class, 'create']);
