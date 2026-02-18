<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $table = 'leads';

    protected $fillable = [
        'name',
        'phone',
        'email',

        'assigned_to',
        'assigned_role',

        'status',
        'priority',

        'follow_up_at',
        'sla_due_at',
        'sla_breached',

        'call_attempts',
        'last_called_at',

        'campaign_id',
        'source',
    ];

    protected $casts = [
        'follow_up_at' => 'datetime',
        'sla_due_at'   => 'datetime',
        'last_called_at' => 'datetime',
        'sla_breached' => 'boolean',
    ];
}
