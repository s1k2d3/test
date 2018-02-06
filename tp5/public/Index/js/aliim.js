
if(window.devicePixelRatio && window.devicePixelRatio > 1){
	replaceimg($("#im_lightin"));
}
var imisInitForm = 0;
$("#im_lightin").mouseover(function(){
//	$('.im_prompt img').css("display",'block')
    var btnstatus = $(this).attr('data-status');
    if(btnstatus == 1){
        $(this).children('.im-img').attr("src",imImgSrc+"/im_over_new_1122.png");
        $(this).attr('data-status',2);
    }else if(btnstatus == 3){
        $(this).children('.im-img').attr("src",imImgSrc+"/im_over_has_new_1122.png");
        $(this).attr('data-status',4);
    } 
	if(window.devicePixelRatio && window.devicePixelRatio > 1){
		replaceimg($("#im_lightin"));
	}
});
$("#im_lightin").mouseout(function(){
//	$('.im_prompt img').css("display",'none')
    var btnstatus = $(this).attr('data-status');
    if(btnstatus == 2){
        $(this).children('.im-img').attr("src",imImgSrc+"/im_normal_new_1122.png");
        $(this).attr('data-status',1);
    }else if(btnstatus == 4){
        $(this).children('.im-img').attr("src",imImgSrc+"/im_normal_has_new_1122.png");
        $(this).attr('data-status',3);
    }
	if(window.devicePixelRatio && window.devicePixelRatio > 1){
		replaceimg($("#im_lightin"));
	}
});
var isTrue=false;
$('#im_lightin').click(function(){
    if(userIsLogin == 1){
        if(imisInitForm == 0){
            createimForm();   
        }
        showIMForm();
    }else{
        nowUserLoginSuc();//调用登录成功回调函数
    }
});
$("#im_closeform").click(function(){
    $(".im-wrapper .title").css("display","none");
    $(".im-wrapper .address").css("display","none");
    $(".im-wrapper .im-message").css("display","none");
    $(".im-wrapper").animate({right:'-410px'});
    $(this).attr('data-status',0);
});
function showIMForm(){
    var imWrapperEle = $('.im-wrapper');
    imWrapperEle.find('.title').css("display","block");
    imWrapperEle.find('.address').css("display","block");
    imWrapperEle.find('.im-message').css("display","block");
    imWrapperEle.animate({
        right:'11px'
    });
    $("#im_closeform").attr('data-status',1);
    $('#im_lightin').children().attr('src',imImgSrc+"/im_normal_new_1122.png");
    $('#im_lightin').attr('data-status',1);
    
    
}
function nowUserLoginSuc(){
    $.ajax({
        type:'post',
        url:'/Operate/getIMInfo',
        success:function (secimInfo){
            if(secimInfo){
                var imInfo  = eval('('+secimInfo+')');
                if(imInfo == "" || imInfo == null){
                    popLogin(1);
                    return false;
                }
                imUId = imInfo['im_uid'];
                imPas = imInfo['im_password'];
                imServiceId = imInfo['im_service'];
                imAppKey = imInfo['im_app_key'];
                imServiceName = imInfo['im_service_name'];
                userIsLogin = 1;
                createimForm();
                showIMForm();
            }
            // if(!imUId || !imPas || !imServiceId ||  !imAppKey || !imServiceName){
            // }
        }
    });
}
function createimForm(){
    if(!imUId || !imPas || !imServiceId ||  !imAppKey || !imServiceName){
        return false;
    }
    WLOG.init({
        uid: imUId,
        appkey: imAppKey,
    });
    WKIT.init({
        uid: imUId,
        appkey: imAppKey,
        credential: imPas,
        touid: imServiceName,           
        container: document.getElementById('im_message'),
        width: '410',
        height: "400",
        theme: '#F3F3F3',
        sendBtn: true,
        groupId: imServiceId,
        sendMsgToCustomService: true,
        onMsgReceived:function(){
            var imLightinEle = $("#im_lightin");
            var formstatus = $("#im_closeform").attr('data-status');
            if(formstatus == 0){ //当窗体为关闭状态
                if(imLightinEle.attr('data-status') == 1) {
                    imLightinEle.children().attr("src",imImgSrc+"/im_normal_has_new_1122.png");
                    imLightinEle.attr('data-status',3);
                } else if (imLightinEle.attr('data-status') == 2) {
                    imLightinEle.children().attr("src",imImgSrc+"/im_over_has_new_1122.png");
                    imLightinEle.attr('data-status',4);
                }
                
                
            }
        },
        onMsgSent:function(){
            var imLightinEle = $("#im_lightin");
            var imgSrc = imImgSrc +"/im_normal_new_1122.png";
            if (imLightinEle.children().attr('src') != imgSrc) {
                $("#im_lightin").children().attr("src",imgSrc);
                imLightinEle.attr('data-status',1);
            }
           
        }
        
    });
    imisInitForm = 1;
    
}





$("#toTOP").mouseover(function () {
    $(this).children('.Totop').attr("src", imImgSrc + "/toTop_over_1122.png");
    if (window.devicePixelRatio && window.devicePixelRatio > 1){
        replaceimg($("#toTOP"));
    }
    
    
});
$("#toTOP").mouseout(function () {
    $(this).children('.Totop').attr("src", imImgSrc + "/toTop_1122.png");
    if (window.devicePixelRatio && window.devicePixelRatio > 1) {
        replaceimg($("#toTOP"));
    }
});
$('#toTOP').click(function () {
    $(window).scrollTop(0);
})

//在mac下替换成高清图
function replaceimg(obj) {
    var dizhi = obj.children().attr('src');
    var newdizhi = dizhi.replace(/.png/, "_mac.png");
    return obj.children().attr("src", newdizhi);
}