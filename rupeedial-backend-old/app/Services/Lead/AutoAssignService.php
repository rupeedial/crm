use App\Models\AutoAssignRule;

class AutoAssignService
{
    public static function assign($campaignId, $city, $product)
    {
        return AutoAssignRule::where('campaign_id', $campaignId)
            ->where(function ($q) use ($city) {
                $q->whereNull('city')
                  ->orWhere('city', $city);
            })
            ->where(function ($q) use ($product) {
                $q->whereNull('product')
                  ->orWhere('product', $product);
            })
            ->value('assign_to'); // returns user_id
    }
}
