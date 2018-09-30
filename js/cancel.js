/*
for：退款
date：2018-09
*/
// JavaScript Document
$(function() {
	cancelJs();
});


/*
自定义
*/
function cancelJs() {	
	//下拉列表
	//切换：下拉显示
	$('#reason, .select span').click(function() {
		var statusVal = $('.select span').attr('data-status');
		if (statusVal == 0) {
			$('.select').find('i').removeClass().addClass('am-icon-angle-up');
			$('.select').children('span').attr('data-status', 1);
		} else {
			$('.select').find('i').removeClass().addClass('am-icon-angle-down');
			$('.select').children('span').attr('data-status', 0);
		}
		$('.select').children('ul').slideToggle(300);	//切换显示列表
	});
	//点击其它：关闭下拉
	$(document).click(function(e) {
		var _con = $('.select');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('.select span').children('i').removeClass().addClass('am-icon-angle-down');
			$('.select ul').hide();
		}
	});
	//点击列表项
	$('.select li').click(function() {
		$('.select span').children('i').removeClass().addClass('am-icon-angle-down');
		$('.select ul').hide();
		$('#reason').val($(this).text());
		$(this).parent().next().val($(this).attr('data-value'));
	});
	
	//提交成功后
	//提示
	$('.button button').click(function() {
		$('#tips').addClass('active');
	});	
	//关闭提示框
	$('.tips footer').click(function() {
		$('#tips').removeClass('active');
	});
}