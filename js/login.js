/*
for：登录
date：2018-08
*/
// JavaScript Document
$(function() {
	login();
	footerToggle();
	$(window).resize(function() {
		footerToggle();
	});
});


/*
自定义
*/
//登录
function login() {
	var statusVal = 0;
	//用户框：下拉
	$('#userStatus').click(function() {
		var statusVal = $(this).attr('data-status');
		if (statusVal == 0) {
			$(this).children('i').removeClass().addClass('am-icon-angle-up');
			$(this).attr('data-status', 1);
			$('footer').hide();
		} else {
			$(this).children('i').removeClass().addClass('am-icon-angle-down');
			$(this).attr('data-status', 0);
			$('footer').show();
		}
		$(this).parent().next().slideToggle(300);	//切换显示
	});
	//点击下拉字段：显示在用户框里，点击其它，隐藏下拉框
	$('.userName li').click(function() {
		$('#username').val($(this).text());
		$('#userStatus').attr('data-status', 0);
		$('#userStatus').children('i').removeClass().addClass('am-icon-angle-down');
		$(this).parent().hide();
	});
	$(document).click(function(e) {
		var _con = $('.userName, #userStatus');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('#userStatus').children('i').removeClass().addClass('am-icon-angle-down');
			$('.userName').hide();
		}
	});
	//密码框：状态
	$('#pwdStatus').click(function() {
		var statusVal = $(this).attr('data-status');
		if (statusVal == 0) {
			$(this).children('i').removeClass().addClass('am-icon-eye');
			$(this).siblings('input').attr('type', 'text');
			$(this).attr('data-status', 1);
		} else {
			$(this).children('i').removeClass().addClass('icon-eye-slash');
			$(this).siblings('input').attr('type', 'password');
			$(this).attr('data-status', 0);
		}
	});
}

//文本框焦点切换时：切换底部显示
function footerToggle() {
	//$('footer').show();
	if ($(window).width() < 750) {		
		$('.am-form-group input').focusin(function() {
			$('footer').hide();
		});
		$('.am-form-group input').focusout(function() {
			$('footer').show();
		});
	}
}