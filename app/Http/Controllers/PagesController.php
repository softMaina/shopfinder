<?php

namespace App\Http\Controllers;

use Route;
use Illuminate\Support\Facades\Auth;
use App\User;

class PagesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->only('dashboard');
    }
    //
    public function index()
    {
        $shops = \App\Shop::orderBy('id', 'DESC')->get();
        return view('pages.index', compact('shops'));
    }

    public function shopdetails($id)
    {
        $shop = \App\Shop::find($id);
        $featured = \App\Shop::where('id', '!=', $id)->orderBy('id', 'DESC')->limit(10)->get();
        return view('pages.shop-details', compact('shop', 'featured'));
    }

    public function gallery()
    {
        $shops = \App\Shop::get();
        return view('pages.gallery', compact('shops'));
    }

    /*============= Backend ===============*/

    public function dashboard()
    {
        $user = Auth::user();
        if (!$user) {
            abort(404);
        }

        if ($user->hasRole('Admin')) {
            return view('pages.backend.users');
        } else if ($user->hasRole('Landlord')) {
            return view('pages.backend.shops');
        } else if ($user->hasRole('Tenant')) {
            return view('pages.backend.shops');
            /*if(user()->hasShop()){
                return view('pages.backend.shops');
            }else{
                return redirect()->route('index');
            }*/
        }

        /*if(\App\Visit::hasUserVisitedShop($this->user()->id)){

        }else{

        }*/
    }

    public function shops()
    {
        $shops = \App\Shop::get();
        return view('pages.backend.shops', compact('shops'));
    }


    public function users()
    {
        return view('pages.backend.users');
    }

    public function tenants()
    {
        $tenants = User::where('role','=','tenant')->get();
        return view('pages.backend.tenants', compact('tenants'));
    }

    public function landlords()
    {
        return view('pages.backend.landlords');
    }

    public function userId($id)
    {
        $user = \App\User::find($id);
        //dd($user->roles()->first());
        return view('pages.backend.user-details', compact('user'));
    }

    public function visits()
    {
        return view('pages.backend.visits');
    }

    public function profile()
    {
        return view('pages.backend.profile');
    }
}
