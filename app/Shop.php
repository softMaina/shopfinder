<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Shop extends Model
{
    //
    public function users()
    {
        return $this->belongsToMany('App\User', 'user_shop', 'shop_id', 'user_id')->withTimestamps();
    }

    public static function hasShops()
    {
        $query = self::select();
        if ($query->count() > 0) {
            return true;
        } else {
            return false;
        }
    }
}
