<?php
namespace app\Admin\controller;

use think\Db;
use think\Controller;
class Index extends Controller
{
    public function Index()
    {
        return view('index');
    }
    public function head()
    {
        return view('head');
    }
    public function left()
    {
        return view('left');
    }
    public function main()
    {
        return view('main');
    }
}
