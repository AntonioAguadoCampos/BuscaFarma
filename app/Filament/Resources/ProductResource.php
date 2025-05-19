<?php

namespace App\Filament\Resources;

use App\Models\Pharmacy;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Illuminate\Support\Facades\Auth;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('name')->columnSpanFull(),
                TextInput::make('description')->columnSpanFull(),
                TextInput::make('price')->numeric()->step(0.1)->columnSpanFull()
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->query(Product::where('pharmacy_id', Pharmacy::where('user_id', Auth::user()->id)->first()->id))
            ->columns([
                TextColumn::make('name'),
                TextColumn::make('description'),
                TextColumn::make('price')->money('EUR'),
            ])
            ->filters([
                Filter::make('name')
                ->form([
                    TextInput::make('name')
                ])
                ->query(function (Builder $query, array $data): Builder {
                    return $query
                        ->when($data['name'], fn ($q, $name) => $q->where('name', 'like', "%{$name}%"));
                }),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
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
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }

    public static function canAccess(): bool
    {
        return Auth::user()?->email !== 'aac@gmail.com';
    }
}
