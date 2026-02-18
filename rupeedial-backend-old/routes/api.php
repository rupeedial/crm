Route::post('/leads/upload', [UploadController::class, 'uploadLeads']);
Route::middleware('auth:sanctum')->group(function () {

    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/read/{id}', [NotificationController::class, 'markRead']);
    Route::get('/telecaller/dashboard', [TelecallerDashboardController::class, 'index']);
    Route::get(
  '/employee/leads/new-today',
  [\App\Http\Controllers\Employee\LeadController::class, 'newLeadsToday']
);
Route::get(
  '/employee/telecaller/queue',
  [\App\Http\Controllers\Employee\TelecallerController::class, 'telecallerQueue']
);
Route::get(
  '/employee/telecaller/today-callbacks',
  [\App\Http\Controllers\Employee\TelecallerController::class, 'todayCallbacks']
);
Route::get(
  '/employee/telecaller/overdue-leads',
  [\App\Http\Controllers\Employee\TelecallerController::class, 'overdueLeads']
);



});
