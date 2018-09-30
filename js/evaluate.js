/*
for：订单评价
date：2018-09
*/
// JavaScript Document
$(function() {
	evaluate();
	$(window).resize(function() {
		evaluateMt();	//评价面板上间距
	});
});


/*
自定义
*/
//主函数
function evaluate() {
	evaluateMt();	//评价面板上间距
	//评价面板
	$('#evaluate').click(function(e) {
		var _con = $('.evaluate');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('#evaluate').removeClass('active');
		}
	});
	//星级
	$('.star i').click(function() {
		$('.star i').removeClass('active');
		for (var i = 0; i <= $(this).index(); i++) {			
			$('.star i').eq(i).addClass('active');
		}
		$(this).siblings('input').val($(this).index() + 1);
	});
	//复选框
	$('.checkbox div').click(function() {
		$(this).toggleClass('active');
		if ($(this).children('input').attr('checked')) {
			$(this).children('input').attr('checked', false);
		} else {
			$(this).children('input').attr('checked', true);
		}
	});
}

//评价面板上间距
function evaluateMt() {
	var eHeight = $('.evaluate').height();
	var eMargin = parseFloat(eHeight / 2);
	$('.evaluate').css('margin-top', '-' + eMargin + 'px');
}