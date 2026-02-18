<?php

namespace App\Services;

use App\Models\Lead;
use Carbon\Carbon;

class SlaService
{
    public static function evaluateLead(Lead $lead)
    {
        if (!$lead->follow_up_at) return;

        $now = Carbon::now();
        $followUp = Carbon::parse($lead->follow_up_at);

        if ($followUp->gt($now)) return;

        $minutesLate = $followUp->diffInMinutes($now);
        $lead->sla_minutes = $minutesLate;

        if ($minutesLate >= 120) {
            $lead->priority = 'CRITICAL';
            $lead->escalated = true;
        } elseif ($minutesLate >= 60) {
            $lead->priority = 'HIGH';
        } elseif ($minutesLate >= 15) {
            $lead->priority = 'NORMAL';
        }

        $lead->save();
    }
}
