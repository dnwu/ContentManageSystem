define(['jquery', 'jquery_cookie'], function () {
    return {
        //判断登陆状态 , 如果没有登陆的时候
        judgeStatus: function () {
            if(!$.cookie('PHPSESSID')){
                location.href = '/html/home/login.html'
            }
        },
        //添加登陆图片
        loading:function(){
            $(document).ajaxStart(function(){
                $('.overlay').show();
            }).ajaxStop(function(){
                $('.overlay').hide();
            })
        },

        //获取URL地址栏中?后边的属性值和属性名
        getSearch:function(){
            var searchObj = {};
            var searchArr = location.search.slice(1).split("&");
            for(var i=0,len=searchArr.length;i<len;i++){
                var arr = searchArr[i].split("=");
                searchObj[arr[0]]=arr[1];
            }
            return searchObj;
        },
    }
})