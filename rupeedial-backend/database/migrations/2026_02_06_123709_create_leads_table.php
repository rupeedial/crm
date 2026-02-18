<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();

            // 🔹 Lead Basic Info
            $table->string('name')->nullable();
            $table->string('phone', 20)->index();
            $table->string('email')->nullable();
            $table->string('city')->nullable();
            $table->string('pin_code', 10)->nullable();

            // 🔹 Loan Details
            $table->string('product_type'); // personal, home, car etc
            $table->decimal('loan_amount', 12, 2)->nullable();
            $table->string('employment_type')->nullable();
            $table->integer('monthly_income')->nullable();
            $table->integer('cibil_score')->nullable();

            // 🔹 Campaign & Source
            $table->unsignedBigInteger('campaign_id')->nullable();
            $table->string('lead_source')->nullable(); // whatsapp, ads, manual, upload

            // 🔹 Assignment
            $table->unsignedBigInteger('assigned_to')->nullable(); // employee / telecaller
            $table->string('assigned_role')->nullable(); // employee | telecaller | partner
            $table->timestamp('assigned_at')->nullable();

            // 🔹 Status Pipeline
            $table->enum('status', [
                'new',
                'called',
                'verified',
                'callback',
                'documents_collected',
                'logged_in',
                'sanctioned',
                'disbursed',
                'closed'
            ])->default('new');

            // 🔹 SLA / Priority
            $table->timestamp('sla_deadline')->nullable();
            $table->boolean('sla_breached')->default(false);
            $table->tinyInteger('priority')->default(3); // 1=high, 2=medium, 3=low

            // 🔹 AI / System Flags
            $table->boolean('is_duplicate')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->decimal('ai_score', 5, 2)->nullable(); // lead quality %

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
