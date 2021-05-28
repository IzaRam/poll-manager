<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EnqueteController;

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

Route::get('/enquetes', [EnqueteController::class, 'index']);
Route::get('/enquetes/{id}', [EnqueteController::class, 'show']);
Route::post('/enquetes', [EnqueteController::class, 'store']);
Route::put('/enquetes/{id}', [EnqueteController::class, 'update']);
Route::delete('/enquetes/{id}', [EnqueteController::class, 'destroy']);

Route::post('/enquetes/opcoes/{id}', [EnqueteController::class, 'opcoes']);
Route::post('/enquetes/opcoes/votar/{id}', [EnqueteController::class, 'votar']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
