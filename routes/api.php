<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::prefix('v1')->namespace('Api\v1')->group(function () {


    Route::post('login', 'UserController@login');
    Route::post('register', 'UserController@register');

    Route::middleware('auth:api')->group(function () {
        Route::get('/user', function () {
            return auth()->user();
        });
        Route::get('/Audience', 'AudienceController@index');
        Route::post('/Audience', 'AudienceController@store');
        Route::get('/Audience/{audience}', 'AudienceController@edit');
        Route::put('/Audience/update/{id}', 'AudienceController@update');
        Route::delete('/Audience/delete/{id}', 'AudienceController@delete');
    });
});
