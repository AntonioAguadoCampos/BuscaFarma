<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ReservationController;
use App\Models\Reservation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationMail;

class RefuseReservation extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'reservation:refuse';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $reservasPending = Reservation::where('status', 'pending')
            ->where('created_at', '<=', now()->subMinutes(2))
            ->with(['pharmacy.user', 'products'])
            ->get();
        foreach ($reservasPending as $reserva) {
            $reserva->status = 'rejected';
            $reserva->save();
            $productNames = $reserva->products->pluck('name')->implode(', ');
            Mail::to($reserva->email)->send(new ReservationMail('rejected', $reserva->id, $reserva->pharmacy->name, $productNames));
        }

        $reservasSinRecoger = Reservation::where('delivered', 0)
            ->where('status', 'approved')
            ->with(['pharmacy.user', 'products'])
            ->get();
        foreach ($reservasSinRecoger as $reservaSinRecoger) {
            Reservation::destroy($reservaSinRecoger->id);
            $productNames = $reservaSinRecoger->products->pluck('name')->implode(', ');
            Mail::to($reservaSinRecoger->pharmacy->email)->send(new ReservationMail('deleted', $reservaSinRecoger->id, $reservaSinRecoger->pharmacy->name, $productNames));
        }
    }
}
