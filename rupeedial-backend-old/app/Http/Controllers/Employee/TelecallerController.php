use App\Models\Lead;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TelecallerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $today = Carbon::today();

        // 1️⃣ New Leads Today
        $newLeadsToday = Lead::where('assigned_to', $userId)
            ->whereDate('created_at', $today)
            ->where('status', 'LEAD')
            ->count();

        // 2️⃣ Today Callbacks
        $todayCallbacks = Lead::where('assigned_to', $userId)
            ->whereNotNull('follow_up_at')
            ->whereDate('follow_up_at', $today)
            ->get([
                'id',
                'customer_name',
                'phone',
                'follow_up_at',
                'status'
            ]);

        return response()->json([
            'new_leads_today' => $newLeadsToday,
            'today_callbacks' => $todayCallbacks,
        ]);
    }
}

public function telecallerQueue(Request $request)
{
    $employeeId = $request->employee_id;
    $now = Carbon::now();

    $leads = Lead::where('assigned_to', $employeeId)
        ->whereIn('status', ['NEW', 'CALLBACK'])
        ->orderByRaw("
            CASE
                WHEN follow_up_at IS NULL THEN 1
                WHEN follow_up_at < '{$now}' THEN 3
                ELSE 2
            END
        ")
        ->limit(20)
        ->get()
        ->map(function ($lead) use ($now) {
            if (!$lead->follow_up_at) {
                $priority = 'FRESH';
            } elseif (Carbon::parse($lead->follow_up_at)->lt($now)) {
                $priority = 'OVERDUE';
            } else {
                $priority = 'CALLBACK';
            }

            return [
                'id' => $lead->id,
                'customer_name' => $lead->customer_name,
                'phone' => $lead->phone,
                'priority' => $priority,
                'follow_up_at' => $lead->follow_up_at
            ];
        });

    return response()->json([
        'status' => true,
        'data' => $leads
    ]);
}


public function todayCallbacks(Request $request)
{
    $employeeId = $request->employee_id;
    $today = Carbon::today();
    $now = Carbon::now();

    $leads = Lead::where('assigned_to', $employeeId)
        ->whereDate('follow_up_at', $today)
        ->get()
        ->map(function ($lead) use ($now) {
            $followUp = Carbon::parse($lead->follow_up_at);
            $minutesLate = $followUp->lt($now)
                ? $followUp->diffInMinutes($now)
                : 0;

            return [
                'id' => $lead->id,
                'customer_name' => $lead->customer_name,
                'phone' => $lead->phone,
                'follow_up_at' => $lead->follow_up_at,
                'minutes_late' => $minutesLate,
                'overdue' => $minutesLate > 0
            ];
        });

    return response()->json([
        'status' => true,
        'data' => $leads
    ]);
}


public function overdueLeads(Request $request)
{
    $employeeId = $request->employee_id;
    $now = Carbon::now();

    $leads = Lead::where('assigned_to', $employeeId)
        ->whereNotNull('follow_up_at')
        ->where('follow_up_at', '<', $now)
        ->orderBy('follow_up_at', 'asc')
        ->get()
        ->map(function ($lead) use ($now) {
            $followUp = Carbon::parse($lead->follow_up_at);

            return [
                'id' => $lead->id,
                'customer_name' => $lead->customer_name,
                'phone' => $lead->phone,
                'follow_up_at' => $lead->follow_up_at,
                'minutes_late' => $followUp->diffInMinutes($now),
            ];
        });

    return response()->json([
        'status' => true,
        'data' => $leads
    ]);
}
->orderByRaw("
  CASE priority
    WHEN 'CRITICAL' THEN 1
    WHEN 'HIGH' THEN 2
    WHEN 'NORMAL' THEN 3
    ELSE 4
  END
")
