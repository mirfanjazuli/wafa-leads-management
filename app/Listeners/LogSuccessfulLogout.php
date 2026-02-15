<?php

namespace App\Listeners;

use App\Models\ActivityLog;
use Illuminate\Auth\Events\Logout;

class LogSuccessfulLogout
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(Logout $event): void
    {
        ActivityLog::create([
            'user_id' => $event->user->id,
            'action' => 'LOGOUT',
            'description' => "{$event->user->name} berhasil logout pada " . now()->format('d-m-Y H:i:s'),
            'ip_address' => request()->ip(),
        ]);
    }
}
