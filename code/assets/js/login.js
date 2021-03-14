$(function () {


    $('#go_reg').on('click', function () {

        $('.loginBox').hide();
        $('.regBox').show();


    })

    $('#go_login').on('click', function () {

        $('.regBox').hide();
        $('.loginBox').show();


    })


    // 校验登录 注册
    let form = layui.form;

    form.verify({

        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {

            // console.log(value);
            // 这里要找注册框下的input 不然登录框和注册框会被选到
            let pwd = $('.regBox input[name=possword]').val();

            //console.log(pwd);
            if (pwd != value) {
                return "输入的密码不一致"
            }


        }



    })



    // 注册请求

    $('.regBox').on('submit', function (e) {

        // 取消浏览器默认行为
        e.preventDefault();


        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.regBox input[name=username]').val(),
                password: $('.regBox input[name=password]').val()
            },
            success: function (res) {

                let layer = layui.layer;
                //console.log(layui.layer);
                //console.log(res);
                if (res.status == 0) {

                    layer.msg('注册成功', { icon: 6 });

                    $('#go_login').click();

                    $('#regBox')[0].reset();
                } else {
                    layer.msg(res.message, { icon: 5 });
                }
            }
        })







    })


    // 登录请求

    $('.loginBox').on('submit', function (e) {

        // 取消浏览器默认行为
        e.preventDefault();

        console.log($('.loginBox input[name=password]').val());

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('.loginBox input[name=username]').val(),
                password: $('.loginBox input[name=password]').val()
            },
            success: function (res) {

                let layer = layui.layer;
                //console.log(layui.layer);
                //console.log(res);
                if (res.status == 0) {

                    localStorage.setItem('token', res.token);

                    location.href = '/code/index.html';


                } else {
                    layer.msg(res.message, { icon: 5 });
                }
            }
        })







    })

















})