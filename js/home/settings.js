define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'template', 'bootstrap_datepicker', 'bootstrap_datepicker_language', 'jquery_region', 'jquery_form', 'uploadify'], function ($, nd, nd, nd, nd, util, nprogress, template, nd, nd, nd, nd, nd) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();

    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //加载页面的时候,发送ajax ,然后渲染页面模板
    $.ajax({
        url: '/v6/teacher/profile',
        type: 'get',
        success: function (data) {
            $('.settings').html(template('setting-temp', data.result));
            //渲染模板后, 执行三级联动函数
            jqRegion();
            //渲染模板后,执行保存修改函数
            save();
            //执行日历插件
            // console.log(data.result)
            datepicker();
            //执行上传头像插件
            uploadify();
        }
    })

    //封装三级联动插件 , 在渲染模板后 , 执行插件
    function jqRegion() {
        $('#PCD').region({
            url: '/lib/jquery-region/region.json'
        })
    }

    //封装一个函数,在渲染模板后 , 执行保存修改的函数
    function save() {
        $('.save-settings').on('click', function ($e) {
            $e.preventDefault();
            $('.form-horizontal').ajaxSubmit({
                data: {
                    tc_hometown: $('#p').find(':selected').text() + '|' + $('#c').find(':selected').text() + '|' + $('#d').find(':selected').text(),
                },
                success: function () {
                    $('.selfCenter').click();
                }
            })
        })
    }


    //封装一个函数,在渲染页面后, 执行,插入日历插件
    function datepicker() {
        $("input[name='tc_birthday']").datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            startDate: '1900-1-1',
            endDate: new Date()
        });
        $("input[name='tc_join_date']").datepicker({
            language: 'zh-CN',
            format: 'yyyy-mm-dd',
            startDate: '1900-1-1',
            endDate: new Date()
        })
    }

    //封装一个函数, 在渲染页面后 ,执行上传图片插件
    function uploadify(){
        $('#upfile').uploadify({
            swf:'/lib/uploadify/uploadify.swf',
            uploader:'/v6/uploader/avatar',
            fileObjName:'tc_avatar',
            height:$('.cover').height(),
            buttonText:'',
            onUploadSuccess:function(obj,data){
                console.log(data)
                $('#avatar_img').attr('src',JSON.parse(data).result.path)
                // location.reload();
            }
        })
    }

})