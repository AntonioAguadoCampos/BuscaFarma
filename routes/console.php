<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Console\Commands\RefuseReservation;

Schedule::command('reservation:refuse')->everyMinute();

Schedule::call(function () {
    Log::info('✅ El scheduler se ejecutó correctamente a ' . now());
})->everyMinute();

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');
