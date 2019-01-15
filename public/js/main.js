$(function() {
	var $loginBox = $('#loginBox'),
        $registerBox = $('#registerBox'),
        $userInfo=$('#userInfo');
	//切换登录
	$registerBox.find('.colMint').on('click', function() {
		$loginBox.show();
		$registerBox.hide();
	});
	//切换注册
	$loginBox.find('.colMint').on('click', function() {
		$loginBox.hide();
		$registerBox.show();
    });
    //注册
    $registerBox.find('button').on('click',function(){
        // console.log('ertyui')
        var username=$registerBox.find('[name="username"]').val();
        var password=$registerBox.find('[name="password"]').val();
        var repassword=$registerBox.find('[name="repassword"]').val();
        // console.log(username,password,repassword)
        $.ajax({
            type: 'post',
            url: '/api/user/register',
            data: {
                username: username,
                password: password,
                repassword:repassword
            },
            dataType: 'json',
            success:function(data){
                $registerBox.find('.colWarning').html(data.message);
                if (!data.code) {
                    //注册成功
                    setTimeout(function() {
                        $loginBox.show();
		                $registerBox.hide();
                    }, 1000);
                }
            }
        })
    })

    //登录
    $loginBox.find('button').on('click', function() {
        console.log('login click')
        //通过ajax提交请求
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $loginBox.find('[name="username"]').val(),
                password: $loginBox.find('[name="password"]').val()
            },
            dataType: 'json',
            success: function(result) {
                console.log('result',result)
                $loginBox.find('.colWarning').html(result.message);
            
                if (!result.code) {
                    //登录成功
                    window.location.reload();
                }
            }
        })
    })
    //退出
    $('#layout').on('click',function(){
        $.ajax({
            url: '/api/user/layout',
            success: function(result) {
                if (!result.code) {
                    window.location.reload();
                }
            }
        });
    })


});
