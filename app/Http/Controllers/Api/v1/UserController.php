<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{
    public function login(Request $request)
    {

        $validData = $this->validate($request, [
            'email' => 'required|exists:users',
            'password' => 'required'
        ]);

        if (!auth()->attempt($validData)) {
            return response([
                'data' => 'اطلاعات صحیح نمی باشد',

            ], 403);
        }

        return response()->json([
           'data'=> auth()->user(),
            'api_token'=>auth()->user()->api_token
        ]);
    }

    public function register(Request $request)
    {
        $validData = $this->validate($request,[
           'name' =>'required|string|max:255',
           'email' =>'required|string|email|max:255|unique:users',
           'password'=>'required|string|min:6|confirmed',
         ]);

        $user =User::create([
           'name'=>$validData['name'],
           'email'=>$validData['email'],
           'password'=>bcrypt($validData['password']),
           'api_token'=> Str::random(100)
        ]);

        return response()->json([
            'data'=> $user
        ]);
    }
}
