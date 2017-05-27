define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'template'], function ($, nd, nd, nd, nd, util, nprogress, template) {
    //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
    util.judgeStatus();


    //添加进度条  依赖nprogress;
    nprogress.start();
    //当结构加载完毕后,然后调用进度条的结束方法;
    $(function () {
        nprogress.done();
    })

    //在发送ajax后的第一时间加载loading图片
    util.loading();


    //便携模板函数
    $.ajax({
        url: '/v6/teacher',
        success: function (data) {
            var result = template('tc-list-temp', data);
            $('#tc-list').html(result);

            //在渲染列表后,点击查看,发送ajax,渲染模态框模板/详细信息
            $(".look-btn").on('click',function(){
                var id = $(this).data('id');
                // console.log(id)
                $.ajax({
                    url:'/v6/teacher/view',
                    type:'get',
                    data:{
                        tc_id:id
                    },
                    success:function(data){
                        //请求成功渲染模板
                        // console.log(data.result)
                        var result1 = template('tc-model-temp',data.result);
                        $('#teacherModal').html(result1);
                    }
                })
            });

            //发送ajax,修改讲师status,启用和注销
            $('.status-btn').on('click',function(){
                var id = $(this).data('id');
                var status =  $(this).data('status');
                var that  = $(this)
                $.ajax({
                    url:'/v6/teacher/handle',
                    type:'post',
                    data:{
                        tc_id:id,
                        tc_status:status
                    },
                    success:function(data){
                        // console.log(that)
                        console.log(data.result.tc_status)
                        that.text(data.result.tc_status==1?'启 用':'注 销')
                        that.data('status',data.result.tc_status)
                    }
                })
            })
        }

    })

    //书写artTemplate过滤器
    template.helper('age',function(data){
        var date = new Date();
        var year = data.slice(0,4);
        return date.getFullYear() - year;
    })
    


})