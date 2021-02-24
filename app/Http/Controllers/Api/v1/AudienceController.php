<?php

namespace App\Http\Controllers\Api\v1;

use App\Audience;
use App\Http\Controllers\Controller;
use App\Http\Requests\AudienceRequest;
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
     * @param AudienceRequest $request
     * @param Filesystem $filesystem
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AudienceRequest $request, Filesystem $filesystem)
    {

        list($imagePath, $filename) = $this->uploadImage($request, $filesystem);


        $audience = Audience::create([
            'name' => $request->name,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'image' => $filename,
            'status' => 1,
            'category_id' => $request->category_id,
            'user_id' => auth('api')->user()->id
        ]);

        return $this->ResponseJson($audience, $imagePath, $filename, 'مخاطب با موفقیت ثبت شد');
    }

    /**
     * @param Audience $audience
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Audience $audience)
    {
        if ($audience->user_id == auth('api')->user()->id) {
            return response()->json([
                'data' => $audience->with('categoryAudience')->get()
            ]);
        } else {
            return response()->json([
                'message' => 'شما اجازه دسترسی ندارید'
            ], 403);
        }
    }

    public function update(AudienceRequest $request, $id, Filesystem $filesystem)
    {

        list($imagePath, $filename) = $this->uploadImage($request, $filesystem);

        $audience = Audience::findOrFail($id);


        $audience->update([
            'name' => $request->name,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'image' => $filename,
            'status' => 1,
            'category_id' => $request->category_id,
            'user_id' => auth('api')->user()->id
        ]);
        return $this->ResponseJson($audience, $imagePath, $filename, 'مخاطب با موفقیت ویرایش شد');
    }

    /**
     * @param $id
     */
    public function delete($id)
    {
        $audience = Audience::findOrFail($id);
        $audience->delete();
        return response()->json([
            'message' => 'مخاطب با موفقیت حذف شد' ,
        ], 200);
    }

    /**
     * @param AudienceRequest $request
     * @param Filesystem $filesystem
     * @return array
     */
    public function uploadImage(AudienceRequest $request, Filesystem $filesystem)
    {
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
        return array($imagePath, $filename);
    }

    /**
     * @param $audience
     * @param $imagePath
     * @param $filename
     * @param $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function ResponseJson($audience, $imagePath, $filename, $message)
    {
        return response()->json([
            'message' => $message,
            'data' => $audience,
            'imagePath' => url("{$imagePath}/{$filename}")
        ], 200);
    }
}
