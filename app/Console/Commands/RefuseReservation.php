<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\ReservationController;

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
        $reservations = \App\Models\Reservation::where('status', 'pending')
            ->where('created_at', '<', now()->subMinutes(30))
            ->get();
        foreach ($reservations as $reservation) {
            ReservationController::denyReservation($reservation);
        }
        $this->info('Reservas procesadas desde cron.');
    }
}
