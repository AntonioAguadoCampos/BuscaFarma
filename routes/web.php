<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('home');
})->name('home');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::get('/search', function () {
    return Inertia::render('search');
})->name('search');

Route::get('/searchResult', function () {
    return Inertia::render('searchResult');
})->name('searchResult');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
