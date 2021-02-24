<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AudienceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'phoneNumber' => 'required|regex:/(09)[0-9]{9}/|digits_between:10,11',
            'email' => 'required|email',
            'category_id' => 'required',
            'image' => 'nullable|mimes:jpeg,bmp,png|max:5120'
        ];
    }
}
