use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Lead;

public function newLeadsToday(Request $request)
{
    $employeeId = $request->employee_id;

    $leads = Lead::where('assigned_to', $employeeId)
        ->whereDate('created_at', Carbon::today())
        ->orderBy('created_at', 'desc')
        ->get([
            'id',
            'customer_name',
            'phone',
            'assigned_to',
            'created_at'
        ]);

    return response()->json([
        'status' => true,
        'data' => $leads
    ]);
}
