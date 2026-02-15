<?php

namespace App\Listeners;

use App\Models\ActivityLog;
use Illuminate\Auth\Events\Login;

class LogSuccessfulLogin
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
    public function handle(Login $event): void
    {
        ActivityLog::create([
            'user_id' => $event->user->id,
            'action' => 'LOGIN',
            'description' => "{$event->user->name} berhasil login pada " . now()->format('d-m-Y H:i:s'),
            'ip_address' => request()->ip(),
        ]);
    }
}
