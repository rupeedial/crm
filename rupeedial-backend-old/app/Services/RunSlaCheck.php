public function handle()
{
    $leads = \App\Models\Lead::whereNotNull('follow_up_at')
        ->where('status', 'CALLBACK')
        ->get();

    foreach ($leads as $lead) {
        \App\Services\SlaService::evaluateLead($lead);
    }

    $this->info('SLA check completed');
}
