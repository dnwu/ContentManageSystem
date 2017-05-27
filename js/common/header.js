define(['jquery', 'bootstrap'], function ($, nd) {
    $('#logout').on('click', function () {
        $.ajax({
            url: '/v6/logout',
            success: function () {
                location.href = '/html/home/login.html';
            }
        })
    });



})