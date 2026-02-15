<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Http\Resources\LeadResource;
use App\Models\Lead;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    public function index(Request $request)
    {
        $leads = Lead::search($request->search)
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('leads/Index', [
            'leads' => LeadResource::collection($leads),
            'filters' => $request->only('search'),
        ]);
    }


    public function store(StoreLeadRequest $request)
    {
        Lead::create($request->validated());

        return redirect()->back()->with('success', 'Data berhasil dikirim!');
    }

    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        $lead->update($request->validated());

        return redirect()->back()->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(Lead $lead)
    {
        $lead->delete();

        return redirect()->back()->with('success', 'Lead berhasil dihapus!');
    }

}
