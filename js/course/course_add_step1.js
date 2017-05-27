define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'jquery_form', 'template'], function ($, nd, nd, nd, nd, util, nprogress, nd, template) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();


    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //当加载页面的时候,发送ajax请求然后渲染页面
    var id = util.getSearch().cs_id;
    // console.log(id)
    $.get('/v6/course/basic', {
        cs_id: id
    }, function (data) {
        $('.course-add').html(template('step1-temp', data.result))
    })

    //实现课程列表的二级联动
    $(document).on('change', '.category-fir', function () {
        $.ajax({
            url: '/v6/category/child',
            type: 'get',
            data: {
                cg_id: $(this).val()
            },
            success: function (data) {
                var results = "";
                for (var i = 0; i < data.result.length; i++) {
                    results += "<option value='" + data.result[i].cg_id + "'>" + data.result[i].cg_name + "</option>";
                };
                $('.category-sec').html(results)
            }
        })
    })


    //保存修改
    $(document).on('submit','.form-horizontal',function($e){
        $e.preventDefault();
        console.log($(this))
        $(this).ajaxSubmit({
            data:{
                cs_id:id,
            },
            success:function(){
                location.href='/html/course/course_add_step2.html?cs_id='+id
            }
        })
    })
})