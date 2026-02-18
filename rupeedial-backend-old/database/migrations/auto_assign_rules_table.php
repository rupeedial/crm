Schema::create('auto_assign_rules', function (Blueprint $table) {
    $table->id();

    $table->unsignedBigInteger('campaign_id');
    $table->string('city')->nullable();
    $table->string('product')->nullable();

    $table->unsignedBigInteger('assign_to'); // user_id (telecaller)

    $table->timestamps();
});
