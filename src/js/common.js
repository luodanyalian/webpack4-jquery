// $(".vipclub").hover(function() {
//  $(".vipleyuan").show();
// }, function() {
//  $(".vipleyuan").hide();
// });
// $(".vipleyuan").hover(function() {
//  $(".vipleyuan").show();
// }, function() {
//  $(".vipleyuan").hide();
// })
// 右侧滚动条的公共js
import './utils/lazyload.js'
$(function() {
    $(".productList").hide();
    function prolisthide(){
        $(".product span").hide();
        $(".productList").hide();
        $(".productList .right a").each(function(index, item) {
            if ($(item).hasClass('zoomInLeft')) {
                $(item).removeClass('zoomInLeft');
            }
        })
    }
    $(".product").hover(function() {
        $(".product span").show();
        let li = $(".productList .right a");
        for (var i = 0; i < li.length; i++) {
            (function(Index) {
                if (!$(li[Index]).hasClass('zoomInLeft')) {
                    $(li[Index]).css("animation-delay", Index * 0.1 + "s").addClass('zoomInLeft');
                }
            })(i)
        }
        $(".productList").show();
    }, function() {
        if($(".productList").css('display') == 'none'&&$(".product").parent().siblings('li').find('a span').css('display') == 'block'){
            prolisthide();
        }
        
    });
    $(".product").parent().siblings().find('a').hover(function() {
        prolisthide();
    })
    $(".productList").hover(function() {
        $(".product span").show();
        let li = $(".productList .right a");
        for (var i = 0; i < li.length; i++) {
            (function(Index) {
                if (!$(li[Index]).hasClass('zoomInLeft')) {
                    $(li[Index]).css("animation-delay", Index * 0.1 + "s").addClass('zoomInLeft');
                }
            })(i)
        }
        $(".productList").show();
    }, function() {
        prolisthide();
    });
    //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            $("#back-to-top").fadeIn(800);
        } else {
            $("#back-to-top").fadeOut(800);
        }
    });

    //当点击跳转链接后，回到页面顶部位置
    $("#back-to-top").click(function() {
        //$('body,html').animate({scrollTop:0},1000);
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 500);
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 500);
        return false;
    });
    // 购买区域弹出层
    $('.ptwechat').click(function() {
        $('.shadow').fadeIn('fast')
        $('.buy-code').fadeIn('fast')
    })
    $('.shadow,.close').click(function() {
        $('.shadow').fadeOut('fast')
        $('.buy-code').fadeOut('fast')
    })
});

// 主题页面切换按钮


$('.type-item').click(function() {
    // $('.type-item').removeClass('check')
    $(this).siblings().removeClass('check')
    $(this).addClass('check')
    var index = $(this).attr('index')
    var asd = $(this).parent().siblings('.item-area').find('.block');
    $(this).parent().siblings('.item-area').find('.block').removeClass('check')
    asd[index].className = 'block check'
})


$('.item-btn').click(function() {
    var itemIndex = $(this).attr('item-index')
    var imgItems = $(this).parent().parent().parent().find('.item-imgs')
    console.log(imgItems)
    $(this).siblings().removeClass('check')
    $(this).addClass('check')
    $(this).parent().parent().parent().find('.item-imgs').removeClass('check')
    imgItems[itemIndex].className = 'item-imgs check'
})