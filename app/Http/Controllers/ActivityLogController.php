<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityLogResource;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $activityLogs = ActivityLog::with('user')
            ->search($request->search)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('activity-logs/Index', [
            'activityLogs' => ActivityLogResource::collection($activityLogs),
            'filters' => $request->only('search'),
        ]);
    }
}
