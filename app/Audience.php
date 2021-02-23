<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Audience extends Model
{
    protected $fillable = [
        'name','image','status','phoneNumber','email'
    ];

    public function categoryAudience()
    {
        return $this->hasOne(AudienceCategory::class);
    }

}
