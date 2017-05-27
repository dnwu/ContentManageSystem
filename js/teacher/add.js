define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'jquery_form', 'bootstrap_datepicker', 'bootstrap_datepicker_language'], function ($, nd, nd, nd, nd, util, nprogress, nd, nd, nd) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();



    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //发送add ajax请求
    $("#teacher-add-form").ajaxForm(function () {
        location.href = '/html/teacher/list.html';
    })

    //给入职时间添加日历插件
    $('.inTime').datepicker({
        language: 'zh-CN',
        format: 'yyyy-mm-dd',
        endDate: new Date(),
        startDate:'2017-2-7'
    });
})