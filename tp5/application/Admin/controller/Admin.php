<?php
namespace app\Admin\controller;

use think\Db;
use think\Controller;
class Admin extends Controller
{
    public function Index()
    {
        return view('index');
    }
}
