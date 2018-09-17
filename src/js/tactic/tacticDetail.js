import 'jquery'
import '../../js/utils/lazyload.js'
import '../utils/simpleSwiper.js'
import '@/css/common.scss';
import '../common.js'
import '@/css/product/blocksList.scss';
import "@/css/tactic/tacticDetail.scss"
import {initVideo} from './youkuvideo.js'

$(document).ready(function() {
        $('#reproduct').plusGallery({height: '0'});
        // 初始化视频
        initVideo({
        	el: "youkuplayer",
        	btnplay: "play_icon",
        	poster: "video-fc",
        	vid: "XMjg5OTgzNzEwMA"
        })
});

$(window).on('load', function() {
    $('#typeFive').plusGallery({height: '0'});
});