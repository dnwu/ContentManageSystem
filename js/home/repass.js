define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'jquery_form'], function ($, nd, nd, nd, nd, util, nprogress, nd) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();

    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //点击修改,发送ajax请求, 退出到登陆页面
    $('.form-horizontal').on('submit', function ($e) {
        $e.preventDefault();
        if ($('.newpass').val() !== $('.sec-newpass').val()) {
            alert('两次输入的密码不一致')
        } else {
            $(this).ajaxSubmit(function () {
                $('#logout').trigger('click')
            })
        }
    })
})