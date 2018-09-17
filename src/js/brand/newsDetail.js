import 'jquery'
import '../../js/utils/lazyload.js'
import '../utils/simpleSwiper.js'
import '@/css/common.scss';
import '../common.js'
import '@/css/brand/newsDetail.scss';
import {initVideo} from '../tactic/youkuvideo.js'

$(document).ready(function() {
    // 初始化视频
    initVideo({
        el: "youkuplayer",
        btnplay: "play_icon",
        poster: "video-fc",
        vid: "XMjg5OTgzNzEwMA"
    })
});