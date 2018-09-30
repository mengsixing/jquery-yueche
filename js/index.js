/*
for：业务首页
date：2018-09
*/
// JavaScript Document
$(function() {
	indexJs();
});


/*
自定义
*/
function indexJs() {
	//百度地图
	//创建地图并设置中心点和当前城市
	var map = new BMap.Map('map', {
		enableMapClick: false	//禁用地图默认的点击事件
	});
	var point = new BMap.Point(104.0818, 30.546564);	//成都某地
	map.centerAndZoom(point, 7);	//中心点及级数
	map.enableScrollWheelZoom(true);
	map.setCurrentCity('成都');	//当前城市
	//标注：起点
	var point = new BMap.Point(104.0818, 30.546564);
	var icon = new BMap.Icon('images/marker1x.png', new BMap.Size(27, 48), {	//标注大小
		anchor: new BMap.Size(13.5, 43.5)	//标注的偏移量
	});
	var marker = new BMap.Marker(point, {icon: icon});	//创建标注对象并添加到地图
	map.addOverlay(marker);
	//标注：终点
	/*var point2 = new BMap.Point(104.790778, 29.318791);	//自贡某地
	var icon2 = new BMap.Icon('images/marker2x.png', new BMap.Size(27, 48), {
		anchor: new BMap.Size(13.5, 43.5)
	});
	var marker2 = new BMap.Marker(point2, {icon: icon2});
	map.addOverlay(marker2);
	map.centerAndZoom(point2, 7);*/
	
	//切换线路TAB
	$('.line nav a').click(function() {
		$(this).addClass('active').siblings('a').removeClass('active');
		//显示：选择时间
		if ($(this).text() == '预约') {
			$('.line .select').addClass('show');
		} else {
			$('.line .select').removeClass('show');
		}
	});
	
	//切换起点、终点
	$('.line .main .switch').click(function() {
		//交换起点、终点的值
		var t = $('.line .main li:first input').val();
		$('.line .main li:first input').val($('.line .main li:last input').val());
		$('.line .main li:last input').val(t);
		//交换正向车费、逆向车费
		var tt = $(this).attr('data-pay');
		$(this).attr('data-pay', $(this).attr('data-pay2'));
		$(this).attr('data-pay2', tt);
		//显示当前车费
		$('.line .price .pay span').text($(this).attr('data-pay'));
		//map.removeOverlay(marker);	//移除标识
	});
	
	//重新定位
	$('.location div').click(function() {
		map.centerAndZoom(point, 7);
	});
	
	//日历插件：lCalendar
	var calendardatetime = new lCalendar();
	calendardatetime.init({
		'trigger': '#timer',
		'type': 'datetime'
	});
	
	//预约时间框：有值状态
	$(".line .select input").bind("input propertychange", function() {
		var inputVal = $(this).val();
		if (inputVal) {
			$('.line .select').addClass('active');
		}
	});
	
	//全部线路
	//打开面板
	$('.line .main li input, .hotline .title a').click(function() {
		$('#line').addClass('active');
	});
	//关闭面板
	$('#line').click(function(e) {
		var _con = $('#line .box');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('#line').removeClass('active');
		}
	});
	//点击列表项：关闭面板，并获取值
	var start = '成都';	//起点：获取当前的城市
	var end = '';	//终点
	var price = 0;	//正向价格
	var price2 = 0;	//逆向价格
	var ticket = 0;	//优惠券
	var pay = 0;	//正向车费
	var pay2 = 0;	//逆向车费
	$('#line li').click(function() {
		$('#line').removeClass('active');
		start = $(this).attr('data-start');
		end = $(this).attr('data-end');
		price = $(this).attr('data-price');
		price2 = $(this).attr('data-price2');
		ticket = $(this).attr('data-ticket');
		pay = parseFloat(price) - parseFloat(ticket);
		pay2 = parseFloat(price2) - parseFloat(ticket);
		$('#startCity').val(start);	//起点城市
		$('#endCity').val(end);	//终点城市
		$('#pay').val(pay);	//应付正向车费
		$('.line .price .pay span').text(pay);	//显示正向车费
		if (ticket != 0) {	//有优惠券，显示优惠价格
			$('.line .price .ticket').addClass('active');
			$('.line .price .ticket span').text(ticket);
		} else {
			$('.line .price .ticket').removeClass('active');
			$('.line .price .ticket span').text(0);
		}
		$('.line .price, main .button, main .hotline').addClass('active');	//显示：车费、提交按钮，不显示：热门线路
		$('.line .main .switch').attr('data-pay', pay);	//正向车费
		$('.line .main .switch').attr('data-pay2', pay2);	//逆向车费
	});
}