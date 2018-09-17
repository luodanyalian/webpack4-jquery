import 'jquery'
import '../../js/utils/lazyload.js'
import 'swiper/dist/css/swiper.min.css'
import Swiper from 'swiper/dist/js/swiper.min.js'
import '../common.js'
import '@/css/common.scss'
import '@/css/index.scss'

$(function() {
    var swiper = new Swiper('.swiper-container', {
        lazy: true,
        loop: true,
        // autoplay: {
        //     delay: 4000, //1秒切换一次
        // },
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
    swiper.lazy.load();
})