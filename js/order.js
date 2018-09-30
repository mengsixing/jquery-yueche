/*
for：立即下单
date：2018-09
*/
// JavaScript Document
$(function() {
	orderJs();
	$(window).resize(function() {
		orderHeight();	//订单高度
	});
});


/*
自定义
*/
//主函数
function orderJs() {
	orderHeight();	//订单高度
	
	//初始样式及价格、时间状态显示
	var ticket = $('.price .ticket span').text();	//优惠券
	var price = $('#price').val();	//单人拼车费
	if (ticket > 0) {
		$('main').addClass('tick');
	} else {
		$('main').removeClass('tick');
	}
	var pay = parseFloat(price - ticket);	//实付车费
	$('.price .pay span').text(pay);	//显示车费
	$('#pay').val(pay);	//支付车费
	
	//获取时间
	var timer = $('#timer').val();
	timer = new Date(timer);
	var hours = timer.getHours();
	if (hours < 6 || hours > 21) {
		$('footer').addClass('time');
		orderHeight();	//订单高度
		price = price * 4;	//四人为包车
		var pay = parseFloat(price - ticket);	//实付车费
		$('.price .pay span').text(pay);	//显示车费
		$('#pay').val(pay);	//支付车费
	}
	
	//日历插件：lCalendar
	var calendardatetime = new lCalendar();
	calendardatetime.init({
		'trigger': '#timer',
		'type': 'datetime'
	});
	
	//改变时间
	$("#timer").bind("input propertychange", function() {
		var inputVal = $(this).val();
		if (inputVal) {
			timer = new Date(inputVal);
			var hours = timer.getHours();
			if (hours < 6 || hours > 21) {
				$('footer').addClass('time');
				price2 = price * 4;	//四人为包车
			} else {
				price2 = price;
				$('footer').removeClass('time');
			}
			var pay = parseFloat(price2 - ticket);	//实付车费
			$('.price .pay span').text(pay);	//显示车费
			$('#pay').val(pay);	//支付车费
			orderHeight();	//订单高度
		}
	});
	
	//切换线路
	$('.line .switch').click(function() {
		//切换城市及属性
		var c = $(this).attr('data-start');
		$('#startCity').text($(this).attr('data-end'));
		$('#startCity input').val($(this).attr('data-end'));
		$(this).attr('data-start', $(this).attr('data-end'));
		$('#endCity').text(c);
		$('#endCity input').val(c);
		$(this).attr('data-end', c);
		var p = $(this).attr('data-price');
		$(this).attr('data-price', $(this).attr('data-price2'));
		$(this).attr('data-price2', p);
		//计算车费
		$('#price').val($(this).attr('data-price'));	//单人车费
		var price = $('#price').val();
		var pay = parseFloat(price - ticket);	//实付车费
		$('.price .pay span').text(pay);	//显示车费
		$('#pay').val(pay);	//实付车费
	});
	
	//服务类型
	$('.type nav a').click(function() {
		$(this).addClass('active').siblings('a').removeClass('active');
		$(this).siblings('input').val($(this).text());
		$('.select').eq($(this).index()).addClass('active').siblings('.select').removeClass('active');
		if ($(this).text() == '包车') {
			var price2 = price * 4;	//包车：每辆以4人计
			$('#carText').val('1辆');
			$('#carNum').val(1);
			$('footer').removeClass('num');
			orderHeight();	//订单高度
		} else {
			var price2 = price;
			$('#personText').val('1人');
			$('#personNum').val(1);
		}
		var pay = parseFloat(price2 - ticket);	//实付车费
		$('.price .pay span').text(pay);	//显示车费
		$('#pay').val(pay);	//实付车费
	});	
	
	//下拉列表
	//切换：下拉显示
	$('.select').click(function() {
		var statusVal = $(this).children('span').attr('data-status');
		if (statusVal == 0) {
			$(this).find('i').removeClass().addClass('am-icon-angle-up');
			$(this).children('span').attr('data-status', 1);
		} else {
			$(this).find('i').removeClass().addClass('am-icon-angle-down');
			$(this).children('span').attr('data-status', 0);
		}
		$(this).next().slideToggle(300);	//切换显示列表
	});
	//点击其它：关闭下拉
	$(document).click(function(e) {
		var _con = $('.option, .select');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('.select span').children('i').removeClass().addClass('am-icon-angle-down');
			$('.option').hide();
		}
	});
	//点击列表项：人数
	$('.person li').click(function() {
		$('#personText').val($(this).text());	//显示值
		$('#personNum').val($(this).attr('data-value'));	//数量值
		$('#person').children('span').attr('data-status', 0);	//关闭状态
		$('#person').children('span').children('i').removeClass().addClass('am-icon-angle-down');	//按钮样式
		$(this).parent().hide();	//隐藏列表项		
		var num = $('#personNum').val();
		if (num > 3) {
			num = 4;	//4人开始后为包车价
			$('footer').addClass('num');
		} else {
			$('footer').removeClass('num');
		}
		var pay = parseFloat(price * num - ticket);	//实付车费
		$('.price .pay span').text(pay);	//显示车费
		$('#pay').val(pay);	//实付车费
		orderHeight();	//订单高度
	});
	//点击列表项：车辆
	$('.car li').click(function() {
		$('#carText').val($(this).text());	//显示值
		$('#carNum').val($(this).attr('data-value'));	//数量值
		$('#car').children('span').attr('data-status', 0);	//关闭状态
		$('#car').children('span').children('i').removeClass().addClass('am-icon-angle-down');	//按钮样式
		$(this).parent().hide();	//隐藏列表项
		var car = $('#carNum').val();
		var num = car * 4;	//拼车按4个计
		var pay = parseFloat(price * num - ticket);	//实付车费
		$('.price .pay span').text(pay);	//显示车费
		$('#pay').val(pay);	//实付车费
	});
	
	//儿童
	$('.child nav a').click(function() {
		$(this).addClass('active').siblings('a').removeClass('active');
		$(this).siblings('input').val($(this).text());
	});
	
	//提交成功后：提示
	$('#footer button').click(function() {
		$('#tips').addClass('active');
	});
	
	//关闭提示框
	$('.tips footer').click(function() {
		$('#tips').removeClass('active');
	});
}

//订单高度
function orderHeight() {
	var spacer = 13.91304347826087;
	var winWidth = $(window).width();
	if (winWidth > 320) {
		spacer = 15.65217391304348;
	}
	if (winWidth > 360) {
		spacer = 16.30434782608696;
	}
	if (winWidth > 375) {
		spacer = 18;
	}
	var headerHeight = $('#header').innerHeight();
	var footerHeight = $('#footer').innerHeight();
	var winHeight = $(window).height();
	var priceHeight = $('.price').innerHeight();
	var mainHeight = winHeight - headerHeight - footerHeight - spacer;
	var boxHeight = mainHeight - priceHeight;
	$('#order').height(mainHeight);
	$('.box').height(boxHeight);
}