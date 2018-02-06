function pbalistshowkhouse(obj){

    var PBAhouses = [];

    PBAhouses[0] = $(obj).parent().attr('num');

    PBAhouses[1] = $(obj).parent().attr('name');

    PBAhouses[2] = g_config['city'];

    PBAhouses[3] = $(obj).parent().attr('category');

    PBAhouses[4] = $(obj).parent().attr('variant');

    PBAhouses[5] = $(obj).parent().attr('price');

    ga('ec:addProduct', {

        'id': PBAhouses[0],  //房源ID

        'name': PBAhouses[1], //房源名+户型

        'brand': PBAhouses[2],//城市

        'category': PBAhouses[3], //商圈+区域

        'variant': PBAhouses[4], //房源类型  机构下的分类，个人等 取数据库的定义

        'price': PBAhouses[5], //租金

        'quantity': 1, // 次数计数

        'position': '房源详情页', //网页位置 正常列表，搜索列表，清单，行程，详情

    });

    ga('ec:setAction', 'click'); //商品被点击

    ga('send',  'pageview');

    ga('send', 'event', 'UX', 'click', '被点击的房源');



    ga('send', 'event',g_config.from,g_config.city,'查看房源C');

    _hmt.push(['_trackEvent',g_config.from,g_config.city,'查看房源C']);

}



function getOtherHouseItemHtml(item){

    var html = '<li num="'+item['house_id']+'" name="'+item['ga_name']+'" category="'+item['area_data']+'" variant="'+item['hire_way']+'" price="'+item['month_rent']+'">\
        <a onclick="pbalistshowkhouse(this)" target="_blank" href="'+item['link']+'" class="pro-pic"><img style="width: 100%" src="'+item['main_pic'] +'" /></a>\<div class="list-index-text">\<div class="list-pic-title">\<h3>'+item['title'] +'</h3>\<span class="price"><em>￥</em> '+item['month_rent'] +'</span>\</div>\<p class="list-pic-ps">'+item['area_data']+item['desc'] +'</p>\<div class="pro-lab">';

    for(var i in item['labels']){ html += '<span>' + item['labels'][i] + '</span>';}

    html += '</div>\</div>\</li>';

    return html;

}



var changingOtherHouse = 0;

function changeOtherHouse(){

    if(changingOtherHouse==1)

        return;





    LoadingNotice.showIt();

    changingOtherHouse=1;



    var _data = '';

    $.ajax({

        url:"/ajax/getHouseOther/id/"+house_id,

        type: 'POST',

        data: _data,

        dataType: 'json',

        success: function(data) {

            if(data.length == 0){

                $('#OtherHouseContainer').hide();

            }else{

                $('#OtherHouseContainer').show();

            }

            $('#other_house_items_container').html('');

            for( var i in data){

                var item = data[i];

                var PBAhouses = [];

                PBAhouses[0] = data[i].house_id;

                PBAhouses[1] = data[i].ga_name;

                PBAhouses[2] = g_config['city'];

                PBAhouses[3] = data[i].area_data;

                PBAhouses[4] = data[i].hire_way;

                PBAhouses[5] = data[i].month_rent;

                ga('ec:addImpression', {

                    'id': PBAhouses[0],  //房源ID

                    'name': PBAhouses[1], //房源名

                    'brand': PBAhouses[2],//城市

                    'category': PBAhouses[3], //商圈+区域

                    'variant': PBAhouses[4], //房源类型   整租 合租 公寓

                    'price': PBAhouses[5], //租金

                    'quantity': 1, // 次数计数

                    'position': g_config.from+'房源详情', //网页位置 正常列表，搜索列表，清单，行程，详情

                });

                ga('send', 'pageview');



                $('#other_house_items_container').append( getOtherHouseItemHtml(item));

            }

            changingOtherHouse=0;

        },

        error:function(msg){

            changingOtherHouse=0;

            LoadingNotice.stopIt('加载失败！');

        }

    });

}

var changingRelationHouse=0;

function changeRelationHouse(){

    if(changingRelationHouse==1)

        return;



    LoadingNotice.showIt();

    changingRelationHouse=1;



    var _data = '';



    $.ajax({

        url:"/ajax/getHouseSimilar/id/"+house_id,

        type: 'POST',

        data: _data,

        dataType: 'json',

        success: function(data) {

            if(data.length == 0){

                $('#RelationHouseContainer').hide();

            }else{

                $('#RelationHouseContainer').show();

            }

            $('#relation_house_items_container').html('');

            for( var i in data){

                var item = data[i];

                $('#relation_house_items_container').append( getOtherHouseItemHtml(item));

            }

            changingRelationHouse=0;

        },

        error:function(msg){

            changingRelationHouse=0;

            LoadingNotice.stopIt('加载失败！');

        }

    });

}



var LoadingNotice = {

    this_div:{},

    dot_num:0,

    interval_obj:{},

    initView:function(){

        this.this_div = $('#loading_notice_div');

    },

    show:function(msg){

        this.initView();

        this.this_div.html(msg);

        this.this_div.show();

        this.this_div.animate({opacity:0.6});

        setTimeout(function(){

            LoadingNotice.this_div.animate({opacity:0},'normal',function(){

                LoadingNotice.this_div.hide();

            });

        },3000);

    },

    showIt:function(){

        return;

        this.this_div.html('加载中');

        this.interval_obj = setInterval(function(){

            LoadingNotice.dot_num = (LoadingNotice.dot_num+1)%4;

            var dot_str = '';

            for(var i =0;i<LoadingNotice.dot_num;i++){

                dot_str += '.';

            }

            LoadingNotice.this_div.html('加载中'+dot_str);

        },500);



        this.this_div.show();

        this.this_div.animate({opacity:0.6});

    },

    stopIt:function(msg){

        return;

        clearInterval(this.interval_obj);

        if(msg=='加载完成'){

            LoadingNotice.this_div.hide();

            return;

        }

        this.this_div.html(msg);

        setTimeout(function(){

            LoadingNotice.this_div.animate({opacity:0},'normal',function(){

                LoadingNotice.this_div.hide();

            });

        },1000);

    }

};



var yuekanIng=0;

function yuekan(obj){

    if( $('#verify_code-prompt-text').val()==''){

        $('#verify_code-prompt-text').html('请输入验证码');

        $("#verify_code-prompt-text").css("display","none");

        $(".verify").removeClass('prompt');

    }

    if(yuekanIng==1)

        return;

    _hmt.push(['_trackEvent',g_config.from,g_config.city,'房源详情页提交预约看房']);

    ga('send', 'event',g_config.from,g_config.city,'房源详情页提交预约看房');



    var paramsArr = $('.unit-inp input').serializeArray();

    var _data = 'house_ids='+house_id;



    var user_mobile = document.forms['info_form']['user_mobile'].value;





    for(var i in paramsArr){

        if(paramsArr[i].name == 'verify_code' && user_mobile!='')

            continue;



        var is_valid = 1;

        if(paramsArr[i].value==''){

            is_valid = 0;

        }else if(paramsArr[i].name == 'renter_mobile'){

            var reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;

            if (reg.test(paramsArr[i].value)) {



            }else{

                is_valid = 0;

            }

        }





        if(is_valid==0){

            $('.prompt-text-yuyue').hide();

            $('#'+paramsArr[i].name+'-prompt-text').show();



            $('.login-inp .unit-inp').removeClass('prompt');

            $('.unit-inp input[name = "'+paramsArr[i].name+'" ]').parent().addClass('prompt');

            return ;

        }



        _data += '&'+paramsArr[i].name+'='+paramsArr[i].value;

    }



    _hmt.push(['_trackEvent',g_config.from,g_config.city,'房源详情页提交预约看房']);

    ga('send', 'event',g_config.from,g_config.city,'房源详情页提交预约看房');



    yuekanIng=1;

    $.ajax({

        url:"/Menu/yuekan",

        type: 'GET',

        data: _data,

        dataType: 'json',

        success: function(msgObj) {

            var code=msgObj.code;

            var msg=msgObj.msg;

            yuekanIng=0;

            if(code==0){

                yuYueSuccessMsg();

                // $.fancybox.close()

                var PBAhouses = [];

                PBAhouses[0] = $(obj).attr('num');

                PBAhouses[1] = $(obj).attr('name');

                PBAhouses[2] = g_config['city'];

                PBAhouses[3] = $(obj).attr('category');

                PBAhouses[4] = $(obj).attr('variant');

                PBAhouses[5] = $(obj).attr('price');

                ga('ec:addProduct', {

                    'id': PBAhouses[0],  //房源ID

                    'name': PBAhouses[1], //房源名+户型

                    'brand': PBAhouses[2],//城市

                    'category': PBAhouses[3], //商圈+区域

                    'variant': PBAhouses[4], //房源类型  机构下的分类，个人等 取数据库的定义

                    'price': PBAhouses[5], //租金

                    'quantity': 1, // 次数计数

                    'position': 'PC房源详情页' //对应平台 PC WAP  对应PBApage 详情页  清单页

                });

                ga('ec:setAction', 'purchase', { //进入结算流程

                    'id': "T"+PBAhouses[0],

                    'revenue': PBAhouses[5]

                });

                ga('send',  'pageview');

                ga('send', 'event', 'UX', 'purchase', '预约看房');

            }else if(msg!=undefined){

                // LoadingNotice.show(msg);

                if(code == 1010){

                    $("#renter_mobile-prompt-text").html(msg);

                    $("#renter_mobile-prompt-text").css("display","block");

                    $(".mobile").addClass('prompt');

                }else if(code == 1011){

                    $(".mobile_text").html('');

                    $('#verify_code-prompt-text').html(msg);

                    $("#verify_code-prompt-text").css("display","block");

                    $(".verify").addClass('prompt');

                }else if(code == 123104){

                    $("#person_number-prompt-text").html(msg);

                    $("#person_number-prompt-text").css("display","block");

                    setTimeout(function(){

                        document.location.reload();

                    },3000);

                }else{

                    $("#person_number-prompt-text").html(msg);

                    $("#person_number-prompt-text").css("display","block");

                }

            }else{

                $("#person_number-prompt-text").html('预约失败了/(ㄒoㄒ)/~~！请联系客服');

                $("#person_number-prompt-text").css("display","block");

                // LoadingNotice.show('预约失败了/(ㄒoㄒ)/~~！请联系客服');

                setTimeout(function(){

                    document.location.reload();

                },3000);

            }



        },

        error:function(msg){

            yuekanIng=0;

            $("#person_number-prompt-text").html('预约失败了/(ㄒoㄒ)/~~！请联系客服');

            $("#person_number-prompt-text").css("display","block");

            // LoadingNotice.show('预约失败了/(ㄒoㄒ)/~~！请联系客服');

            setTimeout(function(){

                layer.closeAll();

                    },3000);

        }

    });

}





function addMenuConfirm(obj){

    var objP = $(obj).parent();

    $.fancybox({

        titlePosition: 'inline',

        closeBtn: false,

        autoSize	: false,

        width:'400',

        height:'130',

        overlayColor: '#000',

        content: '<div><h2 style="text-align: center">确认是否加入清单？</h2>' +

            '<div style="margin: 50px 60px 0;width: 95px;text-align: center;cursor: pointer;background: #d3d3d3" class="btn-red" onclick="$.fancybox.close()">取消</div>' +

            '<div id="sure_add_menu" num="'+objP.attr('num')+'" name="'+objP.attr('name')+'" category="'+objP.attr('category')+'" variant="'+objP.attr('variant')+'" price="'+objP.attr('price')+'" style="margin: 0 30px;width: 95px;text-align: center;cursor: pointer;" onclick="addMenu(this)" class="btn-red" >确定</div>' +

            '</div>',

        overlayOpacity: 0.9

    });

}



var addMenuIng=0;

function addMenu(obj){

    if(addMenuIng==1)

        return;



    addMenuIng=1;



    var _data = '';



    _hmt.push(['_trackEvent',g_config.from,g_config.city,'房源详情页确认加入清单']);

    ga('send', 'event',g_config.from,g_config.city,'房源详情页确认加入清单');



    $.ajax({

        url:"/Menu/addMenu?house_id="+house_id,

        type: 'POST',

        data: _data,

        dataType: 'json',

        success: function(msgObj) {

            var code=msgObj.code;

            var msg=msgObj.msg;

            if(code=='0'){

                LoadingNotice.show('添加成功！');



                var PBAhouses = [];

                PBAhouses[0] = $(obj).attr('num');

                PBAhouses[1] = $(obj).attr('name');

                PBAhouses[2] = g_config['city'];

                PBAhouses[3] = $(obj).attr('category');

                PBAhouses[4] = $(obj).attr('variant');

                PBAhouses[5] = $(obj).attr('price');

                ga('ec:addProduct', {

                    'id': PBAhouses[0],  //房源ID

                    'name': PBAhouses[1], //房源名+户型

                    'brand': PBAhouses[2],//城市

                    'category': PBAhouses[3], //商圈+区域

                    'variant': PBAhouses[4], //房源类型  机构下的分类，个人等 取数据库的定义

                    'price': PBAhouses[5], //租金

                    'quantity': 1, // 次数计数

                    'position': 'PC', //

                });

                ga('ec:setAction', 'and');  //商品操作

                ga('send',  'pageview');

                ga('send', 'event', 'UX', 'and', '房源加入清单');



            }else if(code==1001){

                // LoadingNotice.show(msg);

                // var loa = window.location.href;

                popLogin(0);

                // loa = encodeURIComponent(loa.substr(7));

                // window.location.href = '/login?return_url='+ encodeURIComponent(loa);

            }else{

                LoadingNotice.show(msg);

            }

            addMenuIng=0;

            $.fancybox.close()

        },

        error:function(msg){

            addMenuIng=0;

            LoadingNotice.show('添加失败了/(ㄒoㄒ)/~~！');

            $.fancybox.close()

        }

    });

}







var house_photos_input = document.forms['info_form']['house_photos[]'];



var img_data = [];



inflate_image_data();

function inflate_image_data(){

    var ul = '';

    for(var i=0;i< house_photos_input.length;i++){

        img_data[i] = {

            'href':'',

            'alt':'',

            'src':house_photos_input[i].value,

            'smallSrc':house_photos_input[i].value,

            'title':''

        };

        ul+='<li><img src="'+house_photos_input[i].value+'" onclick="changePicToBig('+i+')"/></li>';

    }



    if(house_photos_input.length == undefined){

        img_data[0] = {

            'href':'',

            'alt':'',

            'src':house_photos_input.value,

            'smallSrc':house_photos_input.value,

            'title':''

        };

        ul+='<li><img src="'+house_photos_input.value+'" onclick="changePicToBig('+0+')"/></li>';

    }



    $('#carousel_a_ul').append(ul);

}



if(img_data.length>4){

    $('#carousel_a ul').carouFredSel({

        prev: '#prev_a',

        next: '#next_a',

        pagination: "#pager",

        scroll: 1000

    });

}



var cur_img_i=0;

function changePicToBig(img_i){

    cur_img_i = img_i;

    $('#a_big_img').attr('src',img_data[img_i].src);

}



function turnOffFullScreenImg(){

    $('#full_screen_div').hide();

    $('#full_screen_div_bg').hide();

}

function turnImgToFullScreen(img_i){

    cur_img_i  = img_i;

    $('#img_i_count').html((cur_img_i+1)+'/'+img_data.length);

    $('#detailImg-box').html('<img src=\"'+img_data[cur_img_i].src+'\">');

    $('#full_screen_div').show();

    $('#full_screen_div_bg').show();

}

$('#detailImg-next').on('click',function(){

    if(cur_img_i+1>=img_data.length){

        cur_img_i=-1;

    }

    turnImgToFullScreen(++cur_img_i);

    // $('#a_big_img').click();

});

$('#detailImg-pre').on('click',function(){

    if(!cur_img_i){

        cur_img_i = img_data.length;

    }

    turnImgToFullScreen(--cur_img_i);

    // $('#a_big_img').click();

});



$('#Img-next').on('click',function(){

    if(cur_img_i+1>=img_data.length){

        cur_img_i=-1;

    }

    changePicToBig(++cur_img_i);



});

$('#Img-pre').on('click',function(){

    if(!cur_img_i){

        cur_img_i = img_data.length;

    }

    changePicToBig(--cur_img_i);



});