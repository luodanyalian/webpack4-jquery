import 'jquery'
import '../../js/utils/lazyload.js'
import '../utils/jquery.easydropdown.js'
import '@/css/common/easydropdown.flat.css'
import '@/css/common.scss';
import '../common.js'
import "@/css/retailstore/retailstore.scss"
import "@/css/common/myalert.scss"
import { myalert } from './telAlert.js'
import {createMap} from './bdmap.js'
import "@/css/retailstore/bdmap.scss"

$(document).ready(function() {
    /**
     * [myalert description]
     * @param  {[string]} showel [弹框el]
     * @param  {[array]} close  [关闭弹框el]
     * @param  {[string]} btnshow  [显示弹框el]
     * @return {[type]}        [description]
     */
    myalert(".sendtel", ".myalertbox", [".myalert>.title>.close", ".myalertbox>.mask"])
	
	//创建地图
	createMap({
		el: "mapcontainer",
		point: {
			longitude: 116.404,
			latitude: 39.915
		},
		level: 15,
		btnshow: '.openmap',
		showel: '.mapbox',
		close: ['.bdmap-main>.title>.close','.mapbox>.mask']
	});
   
});