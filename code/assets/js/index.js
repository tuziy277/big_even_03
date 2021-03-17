$(function () {



    // 获取头像
    getUserInfo();


})


// 获取用户信息
function getUserInfo() {


    $.ajax({

        url: '/my/userinfo',
        // 获取用户信息记得请求头

        success: function (res) {

            if (res.status != 0) {
                return layui.layer.msg('获取用户信息失败！')
            } else {

                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)

            }
        }
    })


}

// 渲染用户头像
function renderAvatar(user) {

    // 保存用户名称 
    let name = user.nickname || user.username;

    $('#welcome').html('欢迎 &nbsp&nbsp' + name);

    if (user.user_pic != null) {


        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {

        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());


    }



}

// 点击退出功能

$('#btnLogout').on('click', function (e) {
    e.preventDefault();
    layer.confirm('是否退出登录?', { icon: 3, title: '提示' }, function (index) {
        location.href = '/code/login.html';

        localStorage.removeItem('token');

        layer.close(index);
    });
})