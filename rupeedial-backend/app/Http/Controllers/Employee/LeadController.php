<?php

namespace App\Http\Controllers\Employee;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Services\Lead\SlaService;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class LeadController extends Controller
{
    protected SlaService $slaService;

    public function __construct(SlaService $slaService)
    {
        $this->slaService = $slaService;
    }

    /* =========================================================
     |  CREATE NEW LEAD
     ========================================================= */
    public function store(Request $request)
    {
        $lead = Lead::create($request->all());

        $this->slaService->apply($lead);

        return response()->json([
            'message' => 'Lead created successfully',
            'lead'    => $lead
        ]);
    }

    /* =========================================================
     |  UPDATE LEAD
     ========================================================= */
    public function update(Request $request, $id)
    {
        $lead = Lead::findOrFail($id);

        $lead->update($request->all());

        $this->slaService->apply($lead);

        return response()->json([
            'message' => 'Lead updated successfully',
            'lead'    => $lead
        ]);
    }

    /* =========================================================
     |  MY ASSIGNED LEADS (Dashboard)
     ========================================================= */
    public function myAssignedLeads(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $leads = Lead::query()
            ->where('assigned_to', $user->id)
            ->whereNotIn('status', ['converted', 'closed'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'count' => $leads->count(),
            'leads' => $leads
        ]);
    }

    /* =========================================================
     |  NEW LEADS CREATED TODAY (🔥 Missing Method Fixed)
     ========================================================= */
    public function newToday(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $leads = Lead::where('assigned_to', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->whereNotIn('status', ['converted', 'closed'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'count' => $leads->count(),
            'leads' => $leads
        ]);
    }

    /* =========================================================
     |  TODAY CALLBACKS (Telecaller Queue)
     ========================================================= */
    public function todayCallbacks(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $leads = Lead::where('assigned_to', $user->id)
            ->whereDate('follow_up_at', Carbon::today())
            ->whereNotIn('status', ['converted', 'closed'])
            ->orderBy('follow_up_at', 'asc')
            ->get();

        return response()->json([
            'count' => $leads->count(),
            'leads' => $leads
        ]);
    }

    /* =========================================================
     |  OVERDUE / MISSED LEADS
     ========================================================= */
    public function overdueLeads(Request $request)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        $leads = Lead::where('assigned_to', $user->id)
            ->where(function ($query) {
                $query->where('sla_breached', true)
                      ->orWhere(function ($q) {
                          $q->whereNotNull('follow_up_at')
                            ->where('follow_up_at', '<', now());
                      });
            })
            ->whereNotIn('status', ['converted', 'closed'])
            ->orderBy('follow_up_at', 'asc')
            ->limit(50)
            ->get();

        return response()->json([
            'count' => $leads->count(),
            'leads' => $leads
        ]);
    }
}
