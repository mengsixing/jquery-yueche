/*
for：首页（公用）
date：2018-09
*/
// JavaScript Document
$(function() {
	indexPublic();
});


/*
自定义
*/
function indexPublic() {	
	//导航拖动
	//获取全部显示时需要的导航宽度
	var navWidth = 0;	//宽度为navWidth
	$('#nav li').each(function() {
		navWidth = navWidth + $(this).width();	
	});
	var oMax = $(window).width() * 0.93 - $('#header nav i').width() - navWidth;
	//console.log(oMax);	//向左移动的最大距离
	//只允许触屏：水平拖动
	var nav = document.getElementById("nav");
	var oW;
	nav.addEventListener('touchstart', function(e) {
		var touches = e.touches[0];
		oW = touches.clientX - nav.offsetLeft;
		document.addEventListener('touchmove', defaultEvent, false);	//阻止页面的滑动默认事件
	}, false);
	nav.addEventListener('touchmove', function(e) {
		var touches = e.touches[0];
		var oLeft = touches.clientX - oW;
		if (oLeft < oMax) {
			oLeft = oMax;
		}
		if (oLeft > 0) {
			oLeft = 0;
		}
		//console.log(oLeft);	//移动的水平位移
		nav.style.left = oLeft + 'px';
	}, false);
	nav.addEventListener('touchend', function() {
		document.removeEventListener('touchmove', defaultEvent, false);	//阻止页面的滑动默认事件
	}, false);
	function defaultEvent(e) {	//阻止页面的滑动默认事件
		e.preventDefault();
	}
	//窗口变换时恢复默认
	$(window).resize(function() {
		$('#nav').css('left', 0);
	});
	//点击导航
	var liLeft = 0;//向左移动的位置
	$('#header nav li').click(function() {
		$(this).addClass('active').siblings('li').removeClass('active');	//切换样式
		for (var i = 0; i < $(this).index(); i++) {
			liLeft = liLeft + $('#header nav li').eq(i).width();
		}
		liLeft = parseFloat('-' + liLeft);
		if (liLeft < oMax) {
			liLeft = oMax;
		}
		if ($(this).index() == 0) {
			liLeft = 0;
		}
		//console.log(liLeft);
		nav.style.left = liLeft + 'px';
	});
	
	//会员面板
	//打开会员面板
	$('#header .tools .user').click(function() {
		$('#member').addClass('active');
	});
	//关闭会员面板
	$('#member').click(function(e) {
		var _con = $('.member');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$(this).removeClass('active');
		}
	});
	
	//选择城市
	//打开面板
	$('#header .tools .address').click(function() {
		$('#selectCity').addClass('active');
	});
	//关闭面板
	$('#selectCity form a').click(function() {
		$('#selectCity').removeClass('active');
	});
	//显示搜索出来的结果
	$("#selectCity form input").bind("input propertychange", function() {
		var searchVal = $(this).val();
		if (searchVal) {
			$('#selectCity .title').hide();
			$("#selectCity .list li").each(function() {
				$(this).hide().filter(":contains('" + searchVal + "')").show().parent().prev().show();
			});
		}
		else {
			$('#selectCity .title, #selectCity .list li').show();
		}
	});
	//点击列表项：关闭并返回值
	var liLeft = 0;//向左移动的位置
	$("#selectCity .list li").click(function() {
		$('#selectCity').removeClass('active');
		$('#header .tools .address .select span').text($(this).text());
	});
	//漂窗偏移
	var aside = $('#selectCity .aside li').length;
	$('#selectCity .aside').css('margin-top', '-' + aside * .08 + 'rem');
	//点击漂窗选项：城市列表滚动到相应位置
	$('#selectCity .aside li').click(function() {		
		var titleHeight = $('#selectCity .title').innerHeight() * $(this).index();
		var ulHeight = 0;
		for (var i = 0; i <  $(this).index(); i++) {
			ulHeight = ulHeight + $('#selectCity .list ul').eq(i).innerHeight();
		}
		var scrollHeight = titleHeight + ulHeight;
		$('#selectCity .list').animate({scrollTop: scrollHeight}, 'fast');
	});
	
	//全部服务
	//打开面板
	$('#header nav i').click(function() {
		$('#service').addClass('active');
	});
	//关闭面板
	$('#service header i').click(function() {
		$('#service').removeClass('active');
	});
	$('#service').click(function(e) {
		var _con = $('#service ul');
		if (!_con.is(e.target) && _con.has(e.target).length === 0) {
			$('#service').removeClass('active');
		}
	});
	//点击列表项：关闭面板，并且导航偏移
	$('#service li').click(function() {
		$('#service').removeClass('active');	//关闭面板
		$('#header nav li').eq($(this).index()).addClass('active').siblings('li').removeClass('active');	//切换样式
		for (var i = 0; i < $(this).index(); i++) {
			liLeft = liLeft + $('#header nav li').eq(i).width();
		}
		liLeft = parseFloat('-' + liLeft);
		if (liLeft < oMax) {
			liLeft = oMax;
		}
		if ($(this).index() == 0) {
			liLeft = 0;
		}
		//console.log(liLeft);
		nav.style.left = liLeft + 'px';
	});
}