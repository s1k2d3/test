// 帖子发布里面的位置选择弹窗
!(function ($, window, document, undefined) {

  var Plugin = function (elem, options) {
    this.$elem = elem;
    this.$btn = $('.showmap');
    this.$queding=$('.quedingtijiao');
    this.$oMask = $('#mask_shadow');
    this.$oTitle = this.$elem.find('.title');
    this.$title_text = this.$oTitle.find('p');
    this.$close = this.$oTitle.find('span');

    this.b_stop = true; // 防止重复点击
    this.page_w = $(window).width();
    this.page_h = $(window).height();

    this.defaults = {
      ifDrag: false,
      dragLimit: false
    };
    this.opts = $.extend({}, this.defaults, options);
  };

  Plugin.prototype = {
    inital: function () { // 初始化
      var self = this;

      this.$title_text.text(this.$title_text.attr('data-title'));
      this.$elem.css({left:300});

      // this.$elem.on('click', function () {
      //   return false;
      // });

      this.$btn.on('click', function () {
        self.popbox();

        self.b_stop = false;

        return false;
      });

      this.$queding.on('click', function () {
       self.closePopbox();
        return false;
      });

      this.$close.on('click', function () {
        self.closePopbox();
        return false;
      });

      $(document.body).on('click', function () {
        //self.closePopbox();
      });

      // 拖拽事件
      this.$oTitle.on('mousedown', function (ev) {
        if (self.opts.ifDrag) {
          self.drag(ev);
        }

        return false;
      });
    },

    popbox: function () { // 显示弹窗
      var self = this;

      this.$oMask.show().animate({opacity: 1});;
      this.$elem.show().animate({opacity: 1, top: 100,left:450}, function () {
        self.b_stop = true;
      });
    },

    closePopbox: function () { // 关闭弹窗
      var self = this;
      if (this.b_stop) {
        this.$oMask.animate({opacity: 0}, function () {
          $(this).hide();
        });
        this.$elem.animate({opacity: 0, top: 0,left:450}, function () {
          $(this).hide();
        });
      }
    },

    drag: function (ev) { // 拖拽事件
      var self = this;
      var oEvent = ev || window.event;
      var disX = oEvent.clientX - this.$elem.offset().left;
      var disY = oEvent.clientY - this.$elem.offset().top;
      var _move = true;

      $(document).mousemove(function (ev) {
        if (_move) {
          var oEvent = ev || window.event;
          var offset_l = oEvent.clientX - disX;
          var offset_t = oEvent.clientY - disY;

          if (self.opts.dragLimit) {
            if (offset_l <= 0) {
              offset_l = 0;
            } else if (offset_l >= self.page_w - self.$elem.width()) {
              offset_l = self.page_w - self.$elem.width();
            }

            if (offset_t <= 0) {
              offset_t = 0;
            } else if (offset_t >= self.page_h - self.$elem.height()) {
              offset_t = self.page_h - self.$elem.height();
            }
          }

          self.$elem.css({left: offset_l, top: offset_t});
        }
      }).mouseup(function () {
        _move = false;
      });
    },

    constructor: Plugin
  };

  $.fn.popup = function (options) {
    var plugin = new Plugin(this, options);

    return plugin.inital();
  };

})(window.jQuery, window, document);



//引用layer弹框
$(".agreement").click(function(){//服务条款
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        layer.open({
            type: 2,
            title: '&nbsp;',
            skin: 'blt-xieyi',
            shadeClose: true,
            shade: 0.8,
            area: ['85%', '600px'],
            content: 'http://www.baletu.com/Index/agreement.html' //iframe的url
        });
    })
})

var picUrl='';
var head_url ='';
//发帖登录
var index = '';
function popLogin(type){
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            ,title:''
            ,area: '360px'
            ,content:'<div class="kuaisu kuaisu-new">'+
            '	<div class="kuaisu-left kuaisu-left-new">'+
            '		<div class="left-border left-border-new"></div>'+
            '   </div>	'+
            '   <div class="kuaisu-center kuaisu-center-new">快速登录</div>'+
            '	    <div class="kuaisu-right kuaisu-right-new">'+
            '		<div class="left-right left-right-new"></div>'+
            '    </div>	'+
            '</div>'+
            '<div class="shouji">'+
            ' <input type="text" id="renter_mobile" name="renter_mobile" class="phone phone-new" placeholder="手机号" maxlength="11"/>'+
            '<p class="prompt-text mobile_text"></p>'+
            '</div>'+
            '<div class="yanzheng yanzheng-new">'+
            '   <input type="text" name="verify_code" placeholder="验证码" class="yanzheng_input"/>'+
            '   <span id="sendBtn" class="yanzhengma yanzhengma-new" onclick="lay_pop('+type+')">获取验证码</span>'+
            '    <p class="prompt-text code_text"></p>'+
            '</div>'
            ,btn:'登录'
            ,btnAlign: 'c' //按钮居中
            ,shade:0.7 //不显示遮罩
            ,yes: function(index){
                addPopLogin(index);
                if(type == 1){
                    _hmt.push(['_trackEvent',g_config['from'],g_config['city'],'IM页面登录']);
                    ga('send', 'event',g_config['from'],g_config['city'],'IM页面登录');
                }
            }
        })
    })
};

//弹框验证码的刷新
function changeVerifyImagePop(){
    var nowMobile= $('input[name="renter_mobile"]').val();
    var tdata = new Date();
    var t = tdata.getMilliseconds();
    var src = 'other/getVerifyImage?mobile='+nowMobile+'&t='+t;
    document.getElementById('image_code').src = src;
}

//找室友弹框验证码
function lay_pop(type){
    var nowMobile= $('input[name="renter_mobile"]').val();
    var tdata = new Date();
    var t = tdata.getMilliseconds();
    //判断正则表达式mobile
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if(nowMobile == ''||!reg.test(nowMobile)){
        $('#renter_mobile-prompt-text').css("display","block");
    }
    console.log(nowMobile);

    if(!reg.test(nowMobile)){
        $(".mobile_text").html("请您填写正确有效的手机号");
        $(".mobile").addClass('prompt');
        isRunning = false;
    }else{
        layer.open({
            type: 1,
            title :'',
            shade:0.7,
            // offset:'330px',
            // area: '350px',
            content:'<div class="kuaisu">'+
            '<div class="yz-title">请先输入以下图形验证码</div>'+
            '</div>'+
            '<div class="shouji">'+
            '<p class="prompt-text mobile_text">'+

            '</p>'+
            '</div>'+
            '<div class="yanzheng-img">'+
            '    <input type="text" name="verify_image_pop" class="inp_yz" id="verify_image_pop" placeholder="验证码" />'+
            '<img onclick="javascript:changeVerifyImagePop();" id = "image_code" src="other/getVerifyImage?mobile='+nowMobile+'&t='+t+'">'+
            '</div>'+
            '<div class="yanzheng_tishi">'+
            '    <p class="prompt-text image_code_text"><span id="YZ_tishi"></span></p>'+
            '</div>',
            btn:'提交',
            zIndex: layer.zIndex, //重点1
            success: function(zIndex,pop_index){
                layer.setTop(zIndex); //重点2
                if(type == 1){
                    _hmt.push(['_trackEvent',g_config['from'],g_config['city'],'IM获取手机验证码']);
                    ga('send', 'event',g_config['from'],g_config['city'],'IM获取手机验证码');
                }

            }
            ,yes:function(pop_index){
                sendVerifyCodePop(pop_index,1);
            }
        });
    }

}
//头像昵称
function popNick(){
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type: 1
            ,title :'&nbsp;'
            ,id: 'LAY_demo'
            ,content: '<div class="touxiang">'+
            '   <div class="shangchuan">1.上传头像</div>'+
            '   <div class="touxiang-img">'+
            '       <img src="'+head_url+'" alt=""class="upfileimg">'+
            '   </div>'+
            '   <div class="touxiang-btn">'+'上传头像'+
            '           <input type="file"  accept="image/png,image/gif,image/jpg,image/jpeg,image/bmp"  id="nickPhoto" name="headportrait" class=""  style="">'+
            '   </div>'+
            '</div>'+
            '<div class="chengni">'+
            '    <div class="chengni-font">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2.输入称昵</div>'+
            '      <input type="text" name = "nickname" placeholder="输入称昵" class="chengni-input"/>'+
            ' <p class="prompt-text nick_text"></p>'+
            // '<div class="center-box"><a href="javascript:void(0)" onclick="addNickInfo(this)" class="btn-red">完成</a></div>'+
            '</div>'
            ,btn:'完成'
            ,btnAlign: 'c' //按钮居中
            ,shade: 0.7 //不显示遮罩
            ,yes: function(index){
                // layer.closeAll();
                addNickInfo(index);
            }
        })
        layui.use('upload', function(){
            layui.upload({
                url:"/Operate/uploadPhoto"
                ,elem: '#nickPhoto' //指定原始元素，默认直接查找class="layui-upload-file"
                ,method: 'post' //上传接口的http类型
                ,ext: 'jpg|png|gif|jpeg'
                ,success: function(res){
                    picUrl = res.file_name;
                    $(".touxiang").each(function(){
                        var $this = $(this);
                        var img=$this.find("img");
                        var btn=$this.find("input");
                        var imgUrl = picUrl;
                        img.attr('src',imgUrl);
                    })
                }
            });
        })
    })
};

//上传昵称
var  isRunning = false;
function addNickInfo(index){
    var indexUrl = picUrl .lastIndexOf("\/");
    headportrait = picUrl .substring(indexUrl + 1, picUrl .length);
    var info = $('input').serialize();
    info +='&'+'head_portrait'+'='+headportrait;
    $.ajax({
        url:"/Operate/addNick",
        type: 'GET',
        data: info,
        dataType: 'json',
        error:function(request){
            errorMsg();
        },
        success: function(data) {
            if(data.code == 0){
                $('#layui-layer'+index).remove();
                appendText();
                try{
                    addNicknameComplete();
                }catch(err){}
            }if(data.code == 1010){
                $(".nick_text").html(data['message']);
            }
        }

    });

}

//验证码
function sendVerifyCodePop(pop_index,type){
    // if(isRunning){
    //     return false;
    // }
    var image_code_name = $('.yanzheng-img input[name = "verify_image_pop"]').val();
    var renter_mobile = $('input[name="renter_mobile"]').val();
    // isRunning = true;
    if(image_code_name == ''){
        $(".image_code_text").html('图形验证码不能为空');
        return false;
    }
    $.post('/login/getVerifyCode','mobile='+renter_mobile+'&type=1'+'&image_code_name='+image_code_name,function(data){
        var data = eval('('+data+')');
        if(data['code'] == 0){
            dealTimerwater();
            $('#layui-layer-shade'+pop_index).remove();
            $('#layui-layer'+pop_index).remove();
            $(".mobile_text").html('');
            $(".code_text").html(data['message']);
        }else if(data['code'] ==200000||data['code'] ==200001||data['code'] ==200002||data['code'] ==200003){
            $(".mobile_text").html('');
            $(".image_code_text").html(data['message']);
        }else{
            $(".mobile_text").html('');
            $(".code_text").html(data['message']);
            isRunning = false;
        }
    });
};

function dealTimerwater(){
    var timers = 60;
    var daoInterval = setInterval(function(){
        $("#sendBtn").html(--timers+"(s)");
        if(timers == 0){
            clearInterval(daoInterval);
            $("#sendBtn").html("获取验证码");
            isRunning = false;
        }
    },1000);
}

//判断是否登录
function ispoplogin(){
    $.ajax({
        url:"/Operate/ispoplogin",
        dataType: 'json',
        error:function(request){
            errorMsg();
        },
        success: function(data) {
            head_url = data.head_url;
            if(data.code=='0'){
                try{
                    addNicknameComplete();
                }catch(err){}
            }else if(data['code'] == 1004){
                popLogin(0);
                $('#layui-layer'+index).remove();
            }else if(data['code'] == 1005){
                popNick();
            }
        }

    });
}

//登录
var renter_mobile = '';
function addPopLogin(index){
    renter_mobile = $('.shouji input[name="renter_mobile"]').val();
    var _data = $('input').serialize();
    $.ajax({
        url:"/Operate/poplogin",
        type: 'GET',
        data:_data,
        dataType: 'json',
        error:function(request){
            errorMsg();
        },
        success: function(data) {
            var  name = data.nickname;
            head_url = data.head_url;
            if(data.code=='0'){
                layer.closeAll();
                var urlPath = window.location.pathname;
                var urlDate = urlPath.substr(1,5);
                console.log(urlDate);
                if(urlDate == 'house'){
                    window.location.reload();
                }
                try{
                    nowUserLoginSuc();

                }catch(err){}
                if(name == ""||name == null){
                    $('#layui-layer'+index).remove();
                    popNick();
                    appendText()
                }else{
                    $('#layui-layer'+index).remove();
                    appendText()
                    try{
                        addNicknameComplete();
                    }catch(err){}

                }
            }else if(data['code'] == 1001){
                $(".mobile_text").html(data['message']);
                $(".code_text").html('');
            }else if(data['code'] == 1003){
                $(".mobile_text").html('');
                $(".code_text").html(data['message']);
            }
        }

    });
}

function appendText(){
    var userT = $("<a></a>").text(renter_mobile);
    var userIcon = $("<i></i>").addClass('icon icon-user-red');
    $(".login-link ul li:eq(0)").remove();
    $(".login-link ul li a").remove();
    $(".login-link ul li:eq(1)").append(userT)
    $(".login-link ul li a").prepend(userIcon)
}

//信息提示
function errorMsg(){
    layui.use('layer', function(){
        layer.open({
            type: 1,
            title: '信息提示',
            shadeClose: true,
            skin: 'stepMsn',
            content: '提交出现未知错误,刷新页面!',
            btn:'确定'
        });
    })
}

//成功提示
function successMsg(){
    layui.use('layer', function(){
        layer.open({
            type: 1,
            title: '信息提示',
            shadeClose: true,
            skin: 'stepMsn',
            content: '提交成功!',
            btn:'确定',
            yes: function(){
                window.location.href = window.location.href;
            }
        });
    })
}


//预约看房成功提示
function yuYueSuccessMsg(){
    layui.use('layer', function(){
        layer.open({
            type: 1,
            title: '信息提示',
            shadeClose: true,
            skin: 'stepMsn',
            content: '提交成功！正在为你安排工作人员带看，请到 清单--看房行程 中去查看，也可自主联系',
            btn:'确定',
            yes: function(){
                window.location.href = window.location.href;
            }
        });
    })
}

function changeVerifyImage(){
    var tdata = new Date();
    var t = tdata.getMilliseconds();
    var src = 'other/getVerifyImage?mobile='+nowMobile+'&t='+t;
    document.getElementById('image_code').src = src;
}

// 点击获取验证码 弹窗出现
var nowMobile = '';
function lay_yz(sendFunction){
    var  LoginForm = document.forms['LoginForm'];
    nowMobile = LoginForm['mobile'].value;
    var tdata = new Date();
    var t = tdata.getMilliseconds();
    //判断正则表达式mobile
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if(!reg.test(nowMobile)){
       $(".mobile_text").html("请您填写正确有效的手机号");
        isRunning = false;
    }else{
        layui.use('layer', function(){ //独立版的layer无需执行这一句
            var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
            layer.open({
                type: 1
                ,title :''
                ,content:'<div class="kuaisu">'+
                '<div class="yz-title">请先输入以下图形验证码</div>'+
                '</div>'+
                '<div class="shouji">'+
                '<p class="prompt-text mobile_text">'+

                '</p>'+
                '</div>'+
                '<div class="yanzheng-img">'+
                '    <input type="text" name="verify_image_code" class="inp_yz" id="verify_image_code" placeholder="验证码" />'+
                '<img onclick="javascript:changeVerifyImage();" id = "image_code" src="other/getVerifyImage?mobile='+nowMobile+'&t='+t+'">'+
                '</div>'+
                '<div class="yanzheng_tishi">'+
                '    <p class="prompt-text image_code_text"><span id="YZ_tishi"></span></p>'+
                '</div>'
                ,btn:'完成'
                ,btnAlign: 'c' //按钮居中
                ,shade: 0.7 //不显示遮罩
                ,success: function(){
                    /* changeVerifyImage();*/
                }
                ,yes: function(){
                    sendVerifyCodeLogin(1);
                }
            })
        })
    }

}


function yuyueConfirm(obj){
    var objP = $(obj).parent();
    var user_mobile = document.forms['info_form']['user_mobile'].value;
    var user_name = document.forms['info_form']['user_name'].value;
    var mobile_disable  = '';
    var vcode_display = '';
    if(user_mobile==''){

    }else{
        mobile_disable = 'disabled';
        vcode_display = 'style="display:none"';
    }
    layui.use('layer', function(){ //独立版的layer无需执行这一句
        var $ = layui.jquery, layer = layui.layer; //独立版的layer无需执行这一句
        layer.open({
            type:1
            ,title:''
            ,content:
            '<div class="seeRoom-pop">' +
                '<h2>申请预约看房</h2>' +
                '<div class="login-inp">' +
                '    <div class="unit-inp">' +
                '       <input type="text" name="renter_name" placeholder="姓名" value="'+user_name+'" maxlength="10">' +
                '       <p id="renter_name-prompt-text" style="display: none ;color: red" class="prompt-text-yuyue">请输入姓名</p>' +
                '    </div>' +
                '    <div class="unit-inp mobile">' +
                '       <input type="text" name="renter_mobile" placeholder="手机号" value="'+user_mobile+'" '+mobile_disable+' maxlength="11">' +
                '       <p id="renter_mobile-prompt-text" style="display: none ;color: red" class="prompt-text-yuyue mobile_text">请您填写正确有效的手机号</p>' +
                '    </div>' +
                '    <div class="unit-inp verify" '+vcode_display+' >' +
                '       <input style="width: 55%" type="text" name="verify_code" placeholder="验证码" maxlength="10">' +
                '    </div>' +
                '<span id="sendBtn" '+vcode_display+' class="yanzhengma getCodee" onclick="lay_pop(0)";_hmt.push([\'_trackEvent\', \'PC\', \'sh\', \'获取验证码\']);">获取验证码</span>'+
            '      <p id="verify_code-prompt-text" style="display: none ;color: red" class="prompt-text-yuyue">请输入验证码</p>' +
                 '    <div class="unit-inp person">' +
                '         <input type="text" name="person_number" placeholder="入住人数" maxlength="2">' +
                '         <p id="person_number-prompt-text" style="display: none ;color: red" class="prompt-text-yuyue">请输入正确的入住人数</p>' +
                '     </div>' +
                '</div>' +
                '        <div class="center-box"><a num="'+objP.attr('num')+'" name="'+objP.attr('name')+'" category="'+objP.attr('category')+'" variant="'+objP.attr('variant')+'" price="'+objP.attr('price')+'" href="javascript:void(0)" onclick="yuekan(this)" class="btn-red">提交预约看房</a></div>' +
             '</div>'
            ,shade: 0.7 //不显示遮罩
        })
    })
}
//
$('.login-inp .unit-inp').on('click',function(){
    $('.prompt-text-yuyue').hide();
    $('.login-inp .unit-inp').removeClass('prompt');
    $(this).addClass('prompt');
});


