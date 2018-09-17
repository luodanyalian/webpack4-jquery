import 'jquery'
import '../utils/simpleSwiper.js'
import '@/css/common.scss';
import '@/css/product/blocksList.scss';


$(window).on('load', function() {
    $('#theme').plusGallery({height: '0'});
    $('#classifications').plusGallery({height: '0'});
});