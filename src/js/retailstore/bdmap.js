export function createMap(param) {
	$(param.btnshow).click(() => {
    	$('html,body').addClass('ovfHiden')
        $(param.showel).show();
    })
    $.map(param.close, function(item, index) {
        $(item).click(() => {
        	$('html,body').removeClass('ovfHiden');
            $(param.showel).hide();
        })
    });
 

	var map = new BMap.Map(param.el);
	var point = new BMap.Point(param.point.longitude,param.point.latitude);
	map.centerAndZoom(point, param.level);
	map.enableScrollWheelZoom();                 //启用滚轮放大缩小
	var marker = new BMap.Marker(point);  // 创建标注
	  map.addOverlay(marker);               // 将标注添加到地图中
	  marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
	window.setTimeout(function(){  
	    map.panTo(new BMap.Point(param.point.longitude,param.point.latitude));    
	}, 2000);
	 // 添加带有定位的导航控件
	  var navigationControl = new BMap.NavigationControl({
	    // 靠左上角位置
	    anchor: BMAP_ANCHOR_TOP_LEFT,
	    // LARGE类型
	    type: BMAP_NAVIGATION_CONTROL_LARGE,
	    // 启用显示定位
	    enableGeolocation: true
	  });
	  map.addControl(navigationControl);
	  // 添加定位控件
	  var geolocationControl = new BMap.GeolocationControl();
	  geolocationControl.addEventListener("locationSuccess", function(e){
	    // 定位成功事件
	    var address = '';
	    address += e.addressComponent.province;
	    address += e.addressComponent.city;
	    address += e.addressComponent.district;
	    address += e.addressComponent.street;
	    address += e.addressComponent.streetNumber;
	    alert("当前定位地址为：" + address);
	  });
	  geolocationControl.addEventListener("locationError",function(e){
	    // 定位失败事件
	    alert(e.message);
	  });
	  map.addControl(geolocationControl);
	
}