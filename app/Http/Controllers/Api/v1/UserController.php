<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

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
           'data'=> auth()->user()
        ]);
    }
}
