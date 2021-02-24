<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audience extends Model
{
    protected $fillable = [
        'name','image','status','phoneNumber','email' ,'user_id' , 'category_id'
    ];

    public function categoryAudience()
    {

        return $this->hasOne(AudienceCategory::class,'id','category_id');
    }

    protected $hidden = [
        'user_id' , 'category_id'
    ];
}
