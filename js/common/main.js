require.config({
    baseUrl:'/',
    paths:{
        //common文件夹
        header:'js/common/header',
        aside:'js/common/aside',
        util:'js/common/util',
        //course文件夹
        course_add:'js/course/add',
        category_add:'js/course/category_add',
        category_list:'js/course/category_list',
        course_add_step1:'js/course/course_add_step1',
        course_add_step2:'js/course/course_add_step2',
        course_add_step3:'js/course/course_add_step3',
        //course文件夹下边的list
        course_list:'js/course/list',
        //home文件夹
        index:'js/home/index',
        login:'js/home/login',
        repass:'js/home/repass',
        settings:'js/home/settings',
        //teacher
        teacher_add:'js/teacher/add',
        edit:'js/teacher/edit',
        teacher_list:'js/teacher/list',
        //user
        user_list:'js/user/list',
        profile:'js/user/profile',
        

        //lib文件中的框架库
        jquery:'lib/jquery/jquery.min',
        bootstrap:'lib/bootstrap/js/bootstrap',
        jquery_form:'lib/jquery-form/jquery.form',
        jquery_cookie:'lib/jquery-cookie/jquery.cookie',
        bootstrap_datepicker:'lib/bootstrap-datepicker/js/bootstrap-datepicker.min',
        //需要配置依赖
        bootstrap_datepicker_language:'lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        jquery_region:'lib/jquery-region/jquery.region',
        jquery_Jcrop:'lib/jquery-Jcrop/js/jcrop.min',


        //不依赖jquery的框架库
        nprogress:'lib/nprogress/nprogress',
        template:'lib/artTemplate/template',
        uploadify:'/lib/uploadify/jquery.uploadify.min'

    },

    shim:{
        bootstrap:{
            // exports:'',
            deps:['jquery']
        },
        jquery_form:{
            deps:['jquery']
        },
        bootstrap_datepicker_language:{
            deps:['jquery','bootstrap_datepicker']
        },
        uploadify:{
            deps:['jquery']
        },
        jquery_Jcrop:{
            deps:['jquery'],
        }
    }
})

//定义一个对象,然后储存location.pathname

var pathName ={
    '/':'index',
    //course文件夹下
    '/index.html':'index',
    '/html/course/add.html':'course_add',
    '/html/course/category_add.html':'category_add',
    '/html/course/category_list.html':'category_list',
    '/html/course/course_add_step1.html':'course_add_step1',
    '/html/course/course_add_step2.html':'course_add_step2',
    '/html/course/course_add_step3.html':'course_add_step3',
    '/html/course/list.html':'course_list',
    //home文件夹下
    '/html/home/login.html':'login',
    '/html/home/repass.html':'repass',
    '/html/home/settings.html':'settings',
    //teacher文件夹下
    '/html/teacher/add.html':'teacher_add',
    '/html/teacher/edit.html':'edit',
    '/html/teacher/list.html':'teacher_list',
    //user文件夹下
    '/html/user/list.html':'user_list',
    '/html/user/profile.html':'profile',

}

//通过判断加载网页的location.pathname来判断需要加载的js文件
require([pathName[location.pathname]],function(){
    // console.log('main加载ok')
})