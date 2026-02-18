<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Employee\LeadController;
// use App\Events\LeaderboardUpdated;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->prefix('employee')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | LEADS
    |--------------------------------------------------------------------------
    */

    // All assigned leads
    Route::get('/leads/my', [LeadController::class, 'myAssignedLeads']);

    // New leads created today
    Route::get('/leads/new-today', [LeadController::class, 'newToday']);

    // Today's follow-ups
    Route::get('/leads/today-callbacks', [LeadController::class, 'todayCallbacks']);

    // Overdue leads
    Route::get('/leads/overdue', [LeadController::class, 'overdueLeads']);


});
// Route::get('/test-leaderboard', function () {

//     $leaders = [
//         ["name" => "Rahul Sharma", "revenue" => rand(500000,1500000)],
//         ["name" => "Priya Mehta", "revenue" => rand(500000,1500000)],
//         ["name" => "Aman Verma", "revenue" => rand(500000,1500000)],
//     ];

//     broadcast(new LeaderboardUpdated($leaders));

//     return response()->json([
//         "status" => "Event Broadcasted",
//         "leaders" => $leaders
//     ]);


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::middleware(['auth:sanctum', 'role:employee,telecaller'])
    // ->get('/employee/leads/overdue', [LeadController::class, 'overdueLeads']);

//     Route::get(
//     '/employee/leads/overdue',
//     [LeadController::class, 'overdueLeads']
// );