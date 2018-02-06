<?php
namespace app\Admin\controller;

use think\Db;
use think\Controller;
class Login extends Controller
{
    public function login()
    {
        return view('login');
    }
}
