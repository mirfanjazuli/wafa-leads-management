<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Lead;
use Illuminate\Support\Facades\Auth;

class LeadObserver
{
    protected function saveLog($action, $description)
    {
        if (Auth::check()) {
            ActivityLog::create([
                'user_id' => Auth::id(),
                'action' => $action,
                'description' => $description,
                'ip_address' => request()->ip(),
            ]);
        }
    }

    public function updated(Lead $lead) {
        $this->saveLog('UPDATE', Auth::user()->name . " mengedit data Lead ID #{$lead->id} - {$lead->name}");
    }

    public function deleted(Lead $lead) {
        $this->saveLog('DELETE', Auth::user()->name . " menghapus data Lead ID #{$lead->id} - {$lead->name}");
    }
}
