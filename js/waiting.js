/*
for：等待上车
date：2018-09
*/
// JavaScript Document
$(function() {
	waiting();
});


/*
自定义
*/
function waiting() {
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
	var point2 = new BMap.Point(104.790778, 29.318791);	//自贡某地
	var icon2 = new BMap.Icon('images/marker2x.png', new BMap.Size(27, 48), {
		anchor: new BMap.Size(13.5, 43.5)
	});
	var marker2 = new BMap.Marker(point2, {icon: icon2});
	map.addOverlay(marker2);
	map.centerAndZoom(point2, 7);
	
	//二维码
	//切换面板
	$('.qrcode').click(function() {
		$('#qrcode').toggleClass('active');
	});
	//关闭面板
	$('#qrcode').click(function(e) {
		var _con = $('#qrcode .img');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('#qrcode').removeClass('active');
		}
	});
}