define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'template', 'jquery_form'], function ($, nd, nd, nd, nd, util, nprogress, template, nd) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();


    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    });


    //当加载页面的时候,发送ajax请求然后渲染页面
    var id = util.getSearch().cs_id;
    // console.log(id)
    $.get('/v6/course/lesson', {
        cs_id: id
    }, function (data) {
        $('.course-add').html(template('step3-temp', data.result))
    })


    //当点击编辑按钮的时候发送ajax请求渲染回显模态框
    $(document).on('click', '.btn-edit,.btn-add', function () {
        //判断点击的是编辑按钮还是添加课时按钮
        if ($(this).attr('data-id')) {
            $.get('/v6/course/chapter/edit', {
                ct_id: $(this).attr('data-id')
            }, function (data) {
                $('#chapterModal').html(template('model-step3-temp', data.result));
                //给不同的点击添加不同的form action地址
                $(".form-horizontal").attr('action', '/v6/course/chapter/modify')
            })
        } else {
            $('#chapterModal').html(template('model-step3-temp', {}));
            //给不同的点击添加不同的form action地址
            $(".form-horizontal").attr('action', '/v6/course/chapter/add')
        }


    })

    //点击添加修改按钮,发送ajax请求
    $(document).on('click', '.btn-add-edit', function () {
        var ct_id = $(this).attr('data-id');
        var ct_is_free = $('.free-class').prop('checked') ? '1' : '0';
        // console.log(ct_is_free)
        $('.form-horizontal').ajaxSubmit({
            data: {
                ct_cs_id: id,
                ct_id: ct_id,
                ct_is_free: ct_is_free
            },
            success: function () {
                $('#chapterModal').modal('hide');
                $.get('/v6/course/lesson', {
                    cs_id: id
                }, function (data) {
                    $('.course-add').html(template('step3-temp', data.result))
                })
            }
        })
    })
})