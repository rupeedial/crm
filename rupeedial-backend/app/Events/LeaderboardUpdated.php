<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class LeaderboardUpdated implements ShouldBroadcast
{
    use Dispatchable, SerializesModels;

    public $leaders;

    public function __construct($leaders)
    {
        $this->leaders = $leaders;
    }

    public function broadcastOn()
    {
        return new Channel('leaderboard');
    }

    public function broadcastAs()
    {
        return 'LeaderboardUpdated';
    }
}
