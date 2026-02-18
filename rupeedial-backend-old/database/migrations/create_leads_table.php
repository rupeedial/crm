Schema::create('leads', function (Blueprint $table) {
    $table->id();

    $table->unsignedBigInteger('campaign_id');
    $table->string('customer_name');
    $table->string('phone');
    $table->string('city')->nullable();
    $table->string('product')->nullable();
    $table->decimal('loan_amount', 12, 2)->nullable();

    $table->enum('status', [
        'NEW',
        'CALLED',
        'VERIFIED',
        'LOGIN',
        'NON_VERIFIED',
        'DISBURSED'
    ])->default('NEW');

    $table->boolean('is_duplicate')->default(false);

    $table->timestamps();
});
