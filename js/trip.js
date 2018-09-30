/*
for：会员-我的行程
date：2018-09
*/
// JavaScript Document
$(function() {
	trip();
});


/*
自定义
*/
function trip() {
	$('nav li').click(function() {
		$(this).addClass('active').siblings('li').removeClass('active');
		if ($(this).index() == 0) {
			$('main li').show();
		}
		if ($(this).index() == 1) {
			$('main li').hide().filter('.done').show();
		}
		if ($(this).index() == 2) {
			$('main li').hide().filter('.none').show();
		}
	})
}