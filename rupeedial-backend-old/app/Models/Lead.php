class Lead extends Model
{
    protected $fillable = [
        'campaign_id',
        'customer_name',
        'phone',
        'city',
        'product',
        'loan_amount',
        'status',
        'is_duplicate',
    ];
}
