<?php
namespace app\Admin\controller;

use think\Db;
use think\Controller;
class Appointment extends Controller
{
    public function Index()
    {
    	$data = db('appointment')->select();
    	$arr = [];
    	foreach ($data as $key => $value) {
    		$time = $value['appointment_time'];
    		$val = explode(',',$time);
    		$value['start'] = $val[0];
    		$value['end'] = $val[1];
    		$arr[] = $value;
    	}
    	// var_dump($arr);die;
    	$this->assign('arr',$arr);
        // $this->assign("index",['arr'=>$arr]);
        return $this->fetch();
    }
    public function examine()
    {
    	$id = $_GET['id'];
    	$data = db('appointment')->where('appointment_id',$id)->find();
		$time = $data['appointment_time'];
		$val = explode(',',$time);
		$data['start'] = $val[0];
		$data['end'] = $val[1];
    	return $this->fetch('examine',['arr'=>$data]);
    }
    public function update()
    {
    	$id = $_GET['id'];
    	$arr = db('appointment')->where('appointment_id',$id)->update(['appointment_status'=>1]);
    	if($arr){
    		$this->success('成功','appointment/index');
    	}else{
    		$this->error('失败');
    	}
    }
    public function updatedo()
    {
    	$id = $_GET['id'];
    	$arr = db('appointment')->where('appointment_id',$id)->update(['appointment_status'=>3]);
    	if($arr){
    		$this->success('成功','appointment/index');
    	}else{
    		$this->error('失败');
    	}
    }
    public function del()
    {
    	$id = $_GET['id'];
    	$arr = db('appointment')->where('appointment_id',$id)->delete();
    	if($arr){
    		$this->success('成功','appointment/index');
    	}else{
    		$this->error('失败');
    	}
    }
}
