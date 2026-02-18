Schema::table('leads', function (Blueprint $table) {
    $table->unsignedBigInteger('assigned_to')->nullable()->after('status');
});
