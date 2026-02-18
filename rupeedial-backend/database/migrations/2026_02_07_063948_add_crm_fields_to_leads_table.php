<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
{
    Schema::table('leads', function (Blueprint $table) {

        /* ================= ASSIGNMENT ================= */

        if (!Schema::hasColumn('leads', 'assigned_to')) {
            $table->unsignedBigInteger('assigned_to')->nullable()->after('id');
        }

        if (!Schema::hasColumn('leads', 'assigned_role')) {
            $table->string('assigned_role')->nullable()->after('assigned_to');
        }

        /* ================= LEAD STATUS ================= */

        if (!Schema::hasColumn('leads', 'status')) {
            $table->string('status')->default('new')->after('assigned_role');
        }

        if (!Schema::hasColumn('leads', 'priority')) {
            $table->string('priority')->default('normal')->after('status');
        }

        /* ================= FOLLOW-UP & SLA ================= */

        if (!Schema::hasColumn('leads', 'follow_up_at')) {
            $table->timestamp('follow_up_at')->nullable()->after('priority');
        }

        if (!Schema::hasColumn('leads', 'sla_due_at')) {
            $table->timestamp('sla_due_at')->nullable()->after('follow_up_at');
        }

        if (!Schema::hasColumn('leads', 'sla_breached')) {
            $table->boolean('sla_breached')->default(false)->after('sla_due_at');
        }

        /* ================= TELECALLER TRACKING ================= */

        if (!Schema::hasColumn('leads', 'call_attempts')) {
            $table->integer('call_attempts')->default(0)->after('sla_breached');
        }

        if (!Schema::hasColumn('leads', 'last_called_at')) {
            $table->timestamp('last_called_at')->nullable()->after('call_attempts');
        }

        /* ================= CAMPAIGN / SOURCE ================= */

        // ⚠️ campaign_id already exists — DO NOT add again

        if (!Schema::hasColumn('leads', 'source')) {
            $table->string('source')->nullable()->after('campaign_id');
        }

        /* ================= INDEXES ================= */

        $table->index('assigned_to');
        $table->index('status');
        $table->index('priority');
        $table->index('follow_up_at');
    });
}


    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn([
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
            ]);
        });
    }
};
