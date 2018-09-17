import 'jquery'
import '../utils/simpleSwiper.js'
import '@/css/common.scss';
import '@/css/apps/appMain.scss';

$(window).on('load', function() {
    $('#appSwipe').plusGallery({height: '0'});
});

$('.down').click(function () {
    $('.shadow').fadeIn('fast')
    $('.down-code').fadeIn('fast')
})
$('.shadow,#codeClose').click(function () {
    $('.shadow').fadeOut('fast')
    $('.down-code').fadeOut('fast')
})


$('.but').click(function () {
    if($(this).hasClass('check')){

    }else{
        $('.but').removeClass('check');
        $(this).addClass('check');
        $('.block-area').css('display','none')
        $('.'+ $(this).attr('id') +'-area').css('display','block')
    }
})
// 问题分类选择
$('.til-item').click(function () {
    if($(this).hasClass('check')){

    }else{
        $('.til-item').removeClass('check');
        $(this).addClass('check')
        $('.area').css('display','none')
        $('#'+ $(this).attr('id') +'-area').css('display','block')
    }
})