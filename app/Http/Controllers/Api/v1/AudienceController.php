<?php

namespace App\Http\Controllers\Api\v1;

use App\Audience;
use App\Http\Controllers\Controller;
use App\Http\Requests\AudienceRequest;
use Carbon\Carbon;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AudienceController extends Controller
{
    private $userAuth;

    public function __construct()
    {
        $this->userAuth = auth('api')->user();
    }

    /**
     * api:auth
     * get auth user Audience
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $audience = Audience::with('categoryAudience')
            ->where('user_id', $this->userAuth->id)
            ->where('status', 1)
            ->get();

        $audienceNotApproved = Audience::with('categoryAudience')
            ->where('user_id', $this->userAuth->id)
            ->where('status', 0)
            ->get();
        $sharedAudience = Audience::with('categoryAudience')
            ->where('user_id', $this->userAuth->id)
            ->where('status', 0)
            ->whereNotNull('shared')
            ->get();
        return response()->json([
            'data' => $audience,
            'audienceNotApproved' => $audienceNotApproved,
            'sharedAudience' => $sharedAudience
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
        if ($request->image == 'default.jpg'){
            $filename = 'default.jpg';
            $imagePath ='resources/js/upload';

        } else{
            list($filename, $imagePath) = $this->imgUpload($request);
        }
        $audience = Audience::create([
            'name' => $request->name,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'image' => $filename,
            'status' => 1,
            'category_id' => $request->category_id,
            'user_id' => $this->userAuth->id
        ]);

        return $this->ResponseJson($audience, $imagePath, $filename, 'مخاطب با موفقیت ثبت شد');
    }

    /**
     * @param Audience $audience
     * @return \Illuminate\Http\JsonResponse
     */
    public function edit(Audience $audience)
    {
        if ($audience->user_id == $this->userAuth->id) {
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


        $audience = Audience::findOrFail($id);

        if ($request->image == 'default.jpg'){
            $filename = 'default.jpg';
            $imagePath ='resources/js/upload';

        } else{
            list($filename, $imagePath) = $this->imgUpload($request);
        }
        $audience->update([
            'name' => $request->name,
            'email' => $request->email,
            'phoneNumber' => $request->phoneNumber,
            'image' => $filename,
            'status' => 1,
            'category_id' => $request->category_id,
            'user_id' => $this->userAuth->id
        ]);
        return $this->ResponseJson($audience, $imagePath, $filename, 'مخاطب با موفقیت ویرایش شد');
    }

    /**
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete($id)
    {
        $audience = Audience::findOrFail($id);
        $audience->delete();
        return response()->json([
            'message' => 'مخاطب با موفقیت حذف شد',
        ], 200);
    }


    /**
     * @param $user_id
     * @param $audience_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function share($user_id, $audience_id)
    {
        $sAudience = Audience::where('id', $audience_id)->first();

        $sharedAudience = Audience::create([
            'name' => $sAudience->name,
            'email' => $sAudience->email,
            'phoneNumber' => $sAudience->phoneNumber,
            'image' => $sAudience->image,
            'status' => 1,
            'category_id' => $sAudience->category_id,
            'user_id' => $user_id,
            'shared' => $this->userAuth->name
        ]);

        return response()->json([
            'message' => 'مخاطب با موفقیت به اشتراک گذاشته شد',
            'data' => $sharedAudience
        ]);
    }

    public function approveAudience($id)
    {
        $audience = Audience::where('id', $id)->where('status', 0)->first();
        if ($audience && $this->userAuth->id == $audience->user_id) {
            $audience->update([
                'status' => 1
            ]);
            return response()->json([
                'message' => 'مخاطب با موفقیت فعال شد'
            ]);
        } else {
            return response()->json([
                'message' => 'خطایی پیش آمده است'
            ], 403);
        }

    }

    public function categoryFilter($id)
    {
        if ($id == 0){
            $filteredAudience = Audience::with('categoryAudience')->where('user_Id', $this->userAuth->id)->get();
            return response()->json([
                'data' => $filteredAudience
            ]);
        }else{
            $filteredAudience = Audience::with('categoryAudience')->where('category_id',$id)->where('user_Id', $this->userAuth->id)->get();
            return response()->json([
                'data' => $filteredAudience
            ]);
        }


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

    /**
     * @param AudienceRequest $request
     * @return array
     */
    public function imgUpload(AudienceRequest $request)
    {
        $image_64 = $request->image; //your base64 encoded data

        $extension = explode('/', explode(':', substr($image_64, 0, strpos($image_64, ';')))[1])[1];   // .jpg .png .pdf

        $replace = substr($image_64, 0, strpos($image_64, ',') + 1);

        $image = str_replace($replace, '', $image_64);

        $image = str_replace(' ', '+', $image);

        $filename = Str::random(10) . '.' . $extension;

        $imagePath = Storage::disk('js_folder')->put($filename, base64_decode($image));
        return array($filename, $imagePath);
    }


}
