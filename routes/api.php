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
        Route::get('users', 'UserController@allUser');
        //Audience
        Route::get('/Audience', 'AudienceController@index');
        Route::post('/Audience', 'AudienceController@store');
        Route::get('/Audience/{audience}', 'AudienceController@edit');
        Route::put('/Audience/update/{id}', 'AudienceController@update');
        Route::delete('/Audience/delete/{id}', 'AudienceController@delete');
        Route::post('/Audience/share/{user_id}/{audience_id}', 'AudienceController@share');
        Route::get('/Audience/approve/{id}', 'AudienceController@approveAudience');
        Route::get('/Audience/categoryFilter/{id}', 'AudienceController@categoryFilter');

        //Audience Category
        Route::get('/Audience/category/all', 'AudienceCategoryController@index');
        Route::post('/Audience/category', 'AudienceCategoryController@store');

        //Admin
        Route::get('/admin/users', 'AdminController@allUser');
        Route::get('/admin/user/deactivate/{id}', 'AdminController@deactivate');
        Route::get('/admin/user/activate/{id}', 'AdminController@activate');

     });
});
