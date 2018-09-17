import 'jquery'
// import '../utils/simpleSwiper.js'
import '../common'
import '@/css/common.scss';
import '@/css/product/toysList.scss';

$('.show-btn').click(function () {
    var zz = $('.search-area').css('display')
    if(zz == 'none'){
        $('.search-area').fadeIn('fast');
    }else{
        $('.search-area').fadeOut('fast');
    }
    // $('.search-area').show('slow');
})
$('.reset-btn').click(function () {
    $(this).parent().siblings('.check-items').find('.input-val').val('')
    $(this).parent().siblings('.check-items').find('.item').removeClass('checked')
    $(this).parent().siblings('.check-items').find('.item-all').addClass('checked')
    $('.search-area').fadeOut('fast');
})
$('.search-item').click(function () {

})

$('.item').each(function () {
    if($(this).hasClass('checked')){
        var val = $(this).siblings('.input-val').val();
        var checkVal = $(this).attr('itemid')
        if(checkVal){
            $(this).siblings('.input-val').val(val + checkVal + ',')
        }
    }
})


$('.item').click(function () {
    // $(this).siblings('.item').removeClass('checked');
    if($(this).hasClass('item-all')){
        $(this).siblings('.item').removeClass('checked');
        $(this).addClass('checked')
        $(this).siblings('.input-val').val('')
    }else{
        $(this).siblings('.item-all').removeClass('checked');
        var ii = $(this).siblings('.input-val').val();
        var zz = $(this).attr('itemId')
        if($(this).hasClass('checked')){
            $(this).removeClass('checked')
            if(!($(this).siblings('.item').hasClass('checked'))){
                $(this).siblings('.item-all').addClass('checked');
            }
            // 去除一次带，的  再去除一次不带，
            ii=ii.replace(zz + ',',"");
            console.log(ii)
            $(this).siblings('.input-val').val( ii )
            if($(this).siblings('.input-val').val() == 'NaN'){
                $(this).siblings('.input-val').val('')
            }
            console.log($(this).siblings('.input-val').val())
        }else{
            $(this).addClass('checked')
            // 如果本来为空，就不添加，了
            $(this).siblings('.input-val').val( ii +  zz + ',')
        }
    }
})

$('.search-item').click(function () {
    $(this).siblings('.search-item').removeClass('checked')
    $(this).addClass('checked')
    var index = $(this).attr('index')
    var checkItem = $(this).parent().siblings('.check-areas').find('.check-area');
    $(this).parent().siblings('.check-areas').find('.check-area').removeClass('check')
    checkItem[index].className = 'check-area check'
})
