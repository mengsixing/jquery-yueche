/*
for：请输入验证码
date：2018-08
*/
// JavaScript Document
$(function() {
	verification();
	window.onload = function() {	//加载页面时：自动获取焦点
		$('form input:first').focus();
	}
});


/*
自定义
*/
function verification() {
	$('form input').bind('input propertychange', function() {
		if ($(this).val()) {
			$(this).addClass('active').next().focus();
		} else {
			$(this).removeClass('active').prev().focus();
		}
	});
}