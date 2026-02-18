use App\Models\Lead;
use Illuminate\Http\Request;
use App\Services\Lead\AutoAssignService;

use App\Models\Notification;

if ($assignedTo) {
    Notification::create([
        'user_id' => $assignedTo,
        'type'    => 'NEW_LEAD',
        'title'   => 'New Lead Assigned',
        'message' => $lead->customer_name . ' (' . $lead->phone . ')',
    ]);
}

class UploadController extends Controller
{
    public function uploadLeads(Request $request)
    {
        $campaignId = $request->campaign_id;
        $rows = $request->leads; // assume array of rows (Excel parsed)

        $savedLeads = [];



        foreach ($rows as $row) {

            // 🔍 DUPLICATE CHECK
            $exists = Lead::where('phone', $row['phone'])
                ->where('campaign_id', $campaignId)
                ->exists();

            $lead = Lead::create([
                'campaign_id'   => $campaignId,
                'customer_name' => $row['customer_name'],
                'phone'         => $row['phone'],
                'city'          => $row['city'] ?? null,
                'product'       => $row['product'] ?? null,
                'loan_amount'   => $row['loan_amount'] ?? null,
                'is_duplicate'  => $exists,   // ⭐ core logic
                'assigned_to'   => $assignedTo, // ⭐ AUTO ASSIGNED
            ]);

            $savedLeads[] = $lead;
        }

        return response()->json([
            'status' => true,
            'message' => 'Leads uploaded successfully',
            'data' => $savedLeads
        ]);
    }
}
