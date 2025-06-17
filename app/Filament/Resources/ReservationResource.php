<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ReservationResource\Pages;
use App\Filament\Resources\ReservationResource\RelationManagers;
use App\Http\Controllers\ReservationController;
use App\Models\Reservation;
use Filament\Tables\Actions\Action;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Auth;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class ReservationResource extends Resource
{
    protected static ?string $model = Reservation::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                //
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')
                    ->label('Identificador'),
                TextColumn::make('products')
                    ->label('Productos')
                    ->formatStateUsing(fn ($record) => $record->products->pluck('name')->join(',')),
                IconColumn::make('status')
                    ->label('Estado')
                    ->options([
                        'heroicon-o-check-circle' => 'approved',
                        'heroicon-o-x-circle' => 'rejected',
                        'heroicon-o-clock' => 'pending',
                    ])
                    ->colors([
                        'success' => 'approved',
                        'danger' => 'rejected',
                        'warning' => 'pending',
                    ]),
                ])
            ->filters([
                //
            ])
            ->actions([
                Action::make('accept')
                    ->label('Aceptar')
                    ->icon('heroicon-o-check')
                    ->color('success')
                    ->action(function ($record) {
                        ReservationController::acceptReservation($record);
                    })
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->tooltip('Aceptar reserva'),
                Action::make('deny')
                    ->label('Rechazar')
                    ->icon('heroicon-o-x-mark')
                    ->color('danger')
                    ->action(function ($record) {
                        ReservationController::denyReservation($record);
                    })
                    ->visible(fn ($record) => $record->status === 'pending')
                    ->tooltip('Rechazar reserva'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListReservations::route('/'),
            'create' => Pages\CreateReservation::route('/create'),
            'edit' => Pages\EditReservation::route('/{record}/edit'),
        ];
    }

    public static function getEloquentQuery(): Builder
    {
        return parent::getEloquentQuery()->with('products');
    }

    public static function canAccess(): bool
    {
        return Auth::user()?->email !== 'aac@gmail.com';
    }
}
