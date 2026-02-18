<?php

use Illuminate\Support\Facades\Route;
use App\Events\LeaderboardUpdated;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});
Route::get('/test-leaderboard', function () {

    $leaders = [
        ["id"=>1,"name"=>"Rahul","role"=>"Sales","revenue"=>rand(800000,1500000),"leads"=>320],
        ["id"=>2,"name"=>"Priya","role"=>"Telecaller","revenue"=>rand(800000,1500000),"leads"=>270],
        ["id"=>3,"name"=>"Aman","role"=>"Manager","revenue"=>rand(800000,1500000),"leads"=>240],
    ];

    broadcast(new LeaderboardUpdated($leaders));

    return "Leaderboard Updated!";
});