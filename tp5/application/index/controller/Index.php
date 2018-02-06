<?php
namespace app\index\controller;

header("content-type:text/html;charset=utf-8");

use think\Db;
use think\Controller;

class Index extends Controller
{
    public function index()
    {
    	$arr1 = db('house')->where('type_id','1')->select();
    	$arr2 = db('house')->where('type_id','2')->select();
    	$arr3 = db('house')->where('type_id','3')->select();
    	// var_dump($arr2);die;
		return $this->fetch('index',['arr1'=>$arr1,'arr2'=>$arr2,'arr3'=>$arr3]);
    }
    public function show()
    {
    	$id = $_GET['id'];
    	$data = db('house')->where('house_id',$id)->find();
    	return $this->fetch('show',['data'=>$data]);
    }
}

