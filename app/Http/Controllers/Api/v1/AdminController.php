<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class AdminController extends Controller
{
    public function allUser()
    {
        if (Gate::allows('isAdmin')) {
            $users = User::where('role', 'user')->get();
            return response()->json([
                'data' => $users
            ]);
        }
    }

    public function deactivate($id)
    {

        if (Gate::allows('isAdmin')) {
            $users = User::where('id', $id)->firstOrFail();
            $users->update([
                'active' => 0
            ]);
            return response()->json([
                'message' => 'کاربر با موفقیت غیر فعال شد'
            ]);
        }
    }

    public function activate($id)
    {
        if (Gate::allows('isAdmin')) {
            $users = User::where('id', $id)->firstOrFail();
            $users->update([
                'active' => 1
            ]);
            return response()->json([
                'message' => 'کاربر با موفقیت فعال شد'
            ]);
        }
    }
}
