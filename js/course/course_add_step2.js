define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'template', 'uploadify', 'jquery_Jcrop'], function ($, nd, nd, nd, nd, util, nprogress, template, nd, nd) {
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
    $.get('/v6/course/picture', {
        cs_id: id
    }, function (data) {
        $('.course-add').html(template('step2-temp', data.result))
        uploadify();
        // imgJcrop()
    });

    function uploadify() {
        $('#uploadify').uploadify({
            swf: '/lib/uploadify/uploadify.swf',
            uploader: '/v6/uploader/cover',
            fileTypeExts: '*.gif; *.jpg; *.png',
            fileObjName: 'cs_cover_original',
            formData: {
                cs_id: id
            },
            buttonClass: 'btn btn-success btn-sm',
            onUploadSuccess: function (obj, data) {
                // console.log(JSON.parse(data).result.path)
                var src = JSON.parse(data).result.path
                $("#course-img").attr('src', src)
                $("#header-course-img").attr('src', src)
            },
            buttonText: '上传头像',
            width: 76,
            height: 30,
            itemTemplate: '<span></span>'
        });
    }

    //添加裁剪图片插件
    // function imgJcrop() {
    //     $('#course-img').Jcrop()
    // }
    $(document).on('click','.btn-jcrop',function(){
        $('#course-img').Jcrop({
            setSelect:[0,0,200,100],
            aspectRatio:2
        },function(){
            // console.log(this)
            // console.log(this.getSelection())
            var j =this;
            $('.btn-jcrop-send').on('click',function(){
                var obj = j.getSelection();
                $.ajax({
                    url:'/v6/course/update/picture',
                    type:'post',
                    data:{
                        cs_id:id,
                        x:obj.x,
                        y:obj.y,
                        w:obj.w,
                        h:obj.h
                    },
                    success:function(){
                        location.href="/html/course/course_add_step3.html?cs_id="+id;
                    }
                })
            })
        })
    })
})