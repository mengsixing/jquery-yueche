/*
for：退款
date：2018-09
*/
// JavaScript Document
$(function() {
	complain();
});


/*
自定义
*/
function complain() {
	//复选框
	$('.box li').click(function() {
		$(this).toggleClass('active');
		if ($(this).children('input').attr('checked')) {
			$(this).children('input').attr('checked', false);
		} else {
			$(this).children('input').attr('checked', true);
		}
		if ($('.box li:last').hasClass('active')) {
			$('textarea').show();
		} else {
			$('textarea').hide();
		}
	});
}