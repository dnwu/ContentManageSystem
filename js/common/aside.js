define(['jquery', 'bootstrap', 'header', 'jquery_cookie'], function ($, nd, nd, nd) {
    // console.log('主页完美加载了');
    //侧边栏加载头像和名字信息
    var info = $.cookie('info') || '{}';
    var userUrl = JSON.parse(info);
    // console.log(userImgUrl)

    /**
     * 下边是有问题的代码
    *   var userImgUrl = JSON.parse($.cookie('info')) && JSON.parse($.cookie('info')).tc_avatar
     */
    userUrl.tc_avatar && $('.aside .profile .avatar img').attr('src', userUrl.tc_avatar);
    $('.aside .profile h4').text(userUrl.tc_name || '游客');

    //侧边导航栏区域
    //添加课程管理下拉切换
    $('.navs .class-manage').on('click', function () {
        $(this).next().slideToggle()
    })

    //给活动页面添加焦点
    //但是这里有一个特殊情况,就是在某个主页面中有子页面,这些子页面的焦点也应该停在主页面的导航标签上,所以就要判断页面的对应关系;
    var hrefToPathName = {
        '/html/user/profile.html': '/html/user/list.html',
        '/html/teacher/edit.html': '/html/teacher/list.html',
        '/html/home/settings.html': '/',
        '/html/teacher/add.html': '/html/teacher/list.html',
    }
    var pathName = location.pathname;
    var href = hrefToPathName[pathName] ? hrefToPathName[pathName] : pathName;
    // console.log(href)
    $(".navs a").removeClass('active').filter('a[href="' + href + '"]').addClass('active');
})