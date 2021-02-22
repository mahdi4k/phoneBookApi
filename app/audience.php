<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class audience extends Model
{
    protected $fillable = [
        'name','image','status','phone','email'
    ];


}
