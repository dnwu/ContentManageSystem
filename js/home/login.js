define(['bootstrap', 'jquery_form', 'jquery', 'jquery_cookie', 'nprogress','util'], function (nd, nd, $, nd, nprogress,util) {
    $('#login-form').ajaxForm({
        success: function (data) {
            location.href = '/'
            $.cookie('info', JSON.stringify(data.result), {
                path: '/'
            });
        }
    })
    //判断登录状态 , 有过登陆过,则直接跳转到主页
    if ($.cookie('PHPSESSID')) {
        location.href = '/';
    };

    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function(){
        nprogress.done();
    })

    //在发送ajax后的第一时间加载loading图片
    util.loading();
})