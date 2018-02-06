function searchForm()
{
    var formObj = document.forms['form_search'];
    var prefixUrl = formObj['prefixUrl'].value;
    var kw = formObj['kw'].value;
    if(kw != '' && kw != undefined){
        var url = prefixUrl + 'kw' + kw;
    }else{
        var url = prefixUrl ;
    }

    window.location.href = url;
    return false;
}

function searchMonthRent(){
    var formObj = document.forms['form_monthrent'];
    var prefixUrl = formObj['prefixUrl'].value;
   /* console.log(prefixUrl);*/

   /* if(prefixUrl != '') {
       var posL = prefixUrl.lastIndexOf('/');
       var lengthL = prefixUrl.length-1;
       if (posL == lengthL && prefixUrl !='/zhaofang/') {
            prefixUrl = prefixUrl.substring(0, prefixUrl.length-1); 
       }
    }*/
    var rent_begin = formObj['rent_start'].value;
    var rent_end = formObj['rent_end'].value;

    if(rent_begin != '' || rent_end != ''){
        if(rent_begin == ''){
            rent_begin = 0;
        }

        if(rent_end == ''){
            rent_end = 50000;
        }

        var pos = prefixUrl.lastIndexOf('kw');

        if(pos< 0){
            var url = prefixUrl + 'z'+rent_begin + ','+ rent_end;
        } else {
            var pre = prefixUrl.substr(0,pos);
            var last = prefixUrl.substr(pos,prefixUrl.length);
            var url = pre + 'z'+rent_begin+','+ rent_end + last;
        }
    }else{
        var url = prefixUrl ;
    }

    window.location.href = url+'/';
    return false;
}