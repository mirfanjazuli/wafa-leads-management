<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use App\Models\Lead;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard', [
            'stats' => [
                'total_leads' => Lead::count(),
                'new_leads'   => Lead::whereDate('created_at', today())->count(),
                'total_logs'  => ActivityLog::count(),
            ],
            'recent_logs' => ActivityLog::with('user')
                ->latest()
                ->take(10)
                ->get()
                ->map(fn($log) => [
                    'id'          => $log->id,
                    'user'        => $log->user?->name ?? 'System',
                    'action'      => $log->action,
                    'description' => $log->description,
                    'time'        => $log->created_at->diffForHumans(),
                ]),
        ]);
    }
}
