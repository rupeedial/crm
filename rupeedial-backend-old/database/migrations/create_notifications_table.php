Schema::create('notifications', function (Blueprint $table) {
    $table->id();

    $table->unsignedBigInteger('user_id'); // telecaller id
    $table->string('type'); // NEW_LEAD, CALLBACK, etc
    $table->string('title');
    $table->text('message')->nullable();

    $table->boolean('is_read')->default(false);

    $table->timestamps();
});
