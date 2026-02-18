<?php

namespace App\Services\Lead;

use App\Models\Lead;
use Carbon\Carbon;

class SlaService
{
    /**
     * Apply SLA & auto escalation rules
     */
    public function apply(Lead $lead): void
    {
        // 1️⃣ Initial SLA set
        if (!$lead->sla_due_at) {
            $this->setInitialSla($lead);
        }

        // 2️⃣ SLA breach check
        if (
            $lead->sla_due_at &&
            now()->greaterThan($lead->sla_due_at) &&
            !$lead->sla_breached
        ) {
            $this->handleSlaBreach($lead);
        }
    }

    /**
     * Initial SLA timing
     */
    private function setInitialSla(Lead $lead): void
    {
        $lead->sla_due_at = $lead->follow_up_at
            ? Carbon::parse($lead->follow_up_at)
            : now()->addMinutes(15);

        $lead->save();
    }

    /**
     * SLA Breach escalation logic
     */
    private function handleSlaBreach(Lead $lead): void
    {
        $lead->sla_breached = true;

        // 🔥 Priority escalation
        match ($lead->priority) {
            'low'    => $lead->priority = 'normal',
            'normal' => $lead->priority = 'high',
            'high'   => $lead->priority = 'urgent',
            default  => null,
        };

        // 🔥 Optional auto status change
        if ($lead->status === 'new') {
            $lead->status = 'callback';
        }

        $lead->save();
    }
}
