define(['jquery_form', 'jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress'], function (nd, $, nd, nd, nd, nd, util, nprogress) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();

    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //点击创建课程按钮,发送ajax
    $('.form-horizontal').ajaxForm(function(data){
        location.href='/html/course/course_add_step1.html?cs_id='+data.result.cs_id;
    })
})