<?php

namespace App\Http\Controllers\Api\v1;

use App\Audience;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AudienceController extends Controller
{
    public function index()
    {
        $audience = Audience::all();
        return response()->json($audience);
    }

}
