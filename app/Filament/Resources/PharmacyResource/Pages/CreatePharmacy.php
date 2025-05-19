<?php

namespace App\Filament\Resources\PharmacyResource\Pages;

use App\Filament\Resources\PharmacyResource;
use App\Models\User;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreatePharmacy extends CreateRecord
{
    protected static string $resource = PharmacyResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array {
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt('root')
        ]);
        $data['user_id'] = $user->id;
        return $data;
    }
}
