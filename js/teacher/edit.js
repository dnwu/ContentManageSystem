define(['jquery', 'bootstrap', 'header', 'jquery_cookie', 'aside', 'util', 'nprogress', 'template', 'jquery_form', 'bootstrap_datepicker', 'bootstrap_datepicker_language'],
    function ($, nd, nd, nd, nd, util, nprogress, template, nd, nd, nd) {
        //调用util方法来判断登录状态 , 如果没有登陆就直接调转到登陆页面
        util.judgeStatus();

        //调用getSearch方法,来获取url地址栏中的相关信息;
        var searchObj = util.getSearch();
        // console.log(searchObj.tc_id);
        $.ajax({
            url: '/v6/teacher/edit',
            data: {
                tc_id: (searchObj.tc_id)
            },
            success: function (data) {
                $('.teacher-add').html(template('teacher-edit-tmpl', data.result))

                //在成功接受渲染模板后 , 才可以点击按钮 , 然后点击button再次发送保存的ajax;
                $('.submit-btn').on('click', function () {
                    $('#edit-form').ajaxSubmit({
                        data: {
                            tc_id: searchObj.tc_id
                        },
                        success: function () {
                            location.href = "/html/teacher/list.html"
                        }
                    })
                })

                //调用日历插件
                setDate();
            }
        })
        //添加进度条  依赖nprogress;
        nprogress.start();
        //当结构加载完毕后,然后调用进度条的结束方法;
        $(function () {
            nprogress.done();
        })

        //封装一个函数, 在渲染模板后 , 执行
        function setDate() {
            $('input[name="tc_join_date"]').datepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                startDate: '2017-1-1',
                endDate: new Date()

            }).on('changeDate', function ($e) {
                // console.log($e.date);
                $(this).datepicker('hide')
            });
        }
    })