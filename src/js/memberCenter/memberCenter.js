import 'jquery'
import '../common'
import '@/css/common.scss'
import '@/css/memberCenter/memberCenter.scss'
$(function () {
})

$('.btn').click(function () {
    $(this).siblings().removeClass('check')
    $(this).addClass('check')
    var imgItem = $(this).parent().parent().siblings('.right').find('.img-item');
    var textItem = $(this).parent().siblings('.text-area').find('.text-item');
    var index = $(this).attr('index')
    // 去除文字部分选中
    $(this).parent().siblings('.text-area').find('.text-item').removeClass('check')
    // 去除图片部分选中
    $(this).parent().parent().siblings('.right').find('.img-item').removeClass('check')
    textItem[index].className = 'text-item check'
    imgItem[index].className = 'img-item check'
})
$('.item').click(function () {
    $(this).siblings().removeClass('check')
    $(this).addClass('check')
    var index = $(this).attr('index')
    var imgItem = $(this).parent().siblings('.change-img').find('.img-item');
    $(this).parent().siblings('.change-img').find('.img-item').removeClass('check')
    imgItem[index].className = 'img-item check'

})