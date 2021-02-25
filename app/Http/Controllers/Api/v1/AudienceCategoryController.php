<?php

namespace App\Http\Controllers\Api\v1;

use App\AudienceCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AudienceCategoryController extends Controller
{
    private $userAuth;

    public function __construct()
    {
        $this->userAuth = auth('api')->user();
    }


    public function index()
    {
        $audienceCategory = AudienceCategory::where('user_id',$this->userAuth->id)->get();

        return response()->json([
           'data'=>$audienceCategory
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([
            'category_name' => 'required|string|max:30|unique:App\AudienceCategory,category_name'
        ]);

        $category = AudienceCategory::create([
            'category_name' => $request->input('category_name'),
            'user_id'=>$this->userAuth->id
        ]);

        return response()->json([
            'message' => 'دسته بندی با موفقیت ایچاد شد'
        ]);
    }
}
