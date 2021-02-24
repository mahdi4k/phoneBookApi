<?php

namespace App\Http\Controllers\Api\v1;

use App\Audience;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AudienceController extends Controller
{
    /**
     * api:auth
     * get auth user Audience
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $audience = Audience::with('categoryAudience')->where('user_id', auth('api')->user()->id)->get();
        return response()->json([
            'data' => $audience,

        ]);
    }

    /**
     * store Audience
     * api:auth
     * @param Request $request
     * @param Filesystem $filesystem
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, Filesystem $filesystem)
    {
        $Validator = Validator::make($request->all(), [
            'name' => 'required',
            'phoneNumber' => 'required|regex:/(09)[0-9]{9}/|digits_between:10,11',
            'email' => 'required|email',
            'category_id' => 'required',
            'image' => 'nullable|mimes:jpeg,bmp,png|max:5120'
        ]);


        if ($Validator->fails()) {
            return response()->json([
                'data' => $Validator->errors(),
                'status' => 'error',
            ], 422);
        }

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');

            $imagePath = "/upload/images";
            $filename = $imageFile->getClientOriginalName();

            if ($filesystem->exists(public_path("{$imagePath}/${filename}"))) {
                $filename = Carbon::now()->timestamp . "-{$filename}";
            }
            $imageFile->move(public_path($imagePath), $filename);
        } else {
            $filename = 'Q5yV]a.jpg';
            $imagePath = "/upload/images";
        }


        $audience = Audience::create([
            'name' => $request->name,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'image' => $filename,
            'status' => 1,
            'category_id' => $request->category_id,
            'user_id' => auth('api')->user()->id
        ]);

        return response()->json([
            'message' => 'مخاطب با موفقیت ثبت شد',
            'data' => $audience,
            'imagePath' => url("{$imagePath}/{$filename}")
        ], 200);
    }

    public function edit(Audience $audience)
    {
        return $audience;
    }

}
