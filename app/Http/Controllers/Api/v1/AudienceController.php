<?php

namespace App\Http\Controllers\Api\v1;

use App\Audience;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AudienceController extends Controller
{
    public function index()
    {
        $audience = Audience::all();
        return response()->json($audience);
    }

    public function store(Request $request)
    {
        $Validator = Validator::make($request->all(), [
            'name' => 'required',
            'phoneNumber' => 'required|regex:/(09)[0-9]{9}/|digits_between:10,11',
            'email' => 'required|'
        ]);

        if ($Validator->fails()) {
            return response()->json([
                'data' => $Validator->errors(),
                'status' => 'error'
            ], 422);
        }


        return response()->json([
            'data' => 'مخاطب با موفقیت ثبت شد'
        ], 200);
    }

}
