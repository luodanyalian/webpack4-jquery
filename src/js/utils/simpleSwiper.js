
(function() {
    var $ = jQuery;

    $.fn.plusGallery = function(options) {
        var id = $(this).attr('id');
        console.log(id)
        console.log(id)
        console.log(id)
        var $gallery = $('#'+ id);
        console.log($gallery)
        console.log($gallery)
        console.log($gallery)
        var maxPos;
        var curPos = 0;

        function getTotalWidth() {
            var totalWidth = 0;
            // $gallery.find(options.class).each(function() {
            $gallery.find('.swipe-item').each(function() {
                totalWidth += parseInt($(this).width(), 10);
            });
            return totalWidth;
        }
        function getMaxPos() {
            return getTotalWidth()-$gallery.width();
        }

        function moveRight(slideRange) {
            totalWidth = getTotalWidth();
            maxPos = getMaxPos();
            if ((curPos+slideRange) <= maxPos) {
                curPos += slideRange;
            } else {
                curPos = maxPos;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
        }
        
        function moveLeft(slideRange) {
            totalWidth = getTotalWidth();
            maxPos = totalWidth-slideRange;

            if ((curPos-slideRange) > 0) {
                curPos -= slideRange;
            } else {
                curPos = 0;
                $(this).hide();
            }
            $('figure', $gallery).css('transform', 'translate(-'+curPos+'px, 0)');
        }

        /* Set line-height of the buttons to img height, so arrows are vertical-aligned */
        // $('.img-prev, .img-next').css('line-height', $('.slide img').height()+'px');


        // 当空间未填满，默认居中，暂时不需要
        // if ($gallery.width() > getTotalWidth()) {
        //     var offset = ($gallery.width()-getTotalWidth())/2;
        //     var overlayPadding = parseInt($('.img-overlay').css('padding-left'), 10);
        //     $('figure', $gallery).css('transform', 'translate('+offset+'px, 0)');
        //     $('.img-overlay').width(getTotalWidth()-overlayPadding*2).css('left', offset+'px');
        // }
        // 当空间未填满，默认居中部分代码结束，暂时不需要


        /* Mouse functions */
        // $gallery.hover(function() {
        //     if (curPos > 0) {
        //         $('.img-prev').show('fast');
        //     }
        //     if (curPos < getMaxPos()) {
        //         $('.img-next').show('fast');
        //     }
        //
        // }, function() {
        //     $('.img-prev').hide('fast');
        //     $('.img-next').hide('fast');
        // });
        $gallery.find('.img-next').click(function() {
            // moveRight($gallery.width());
            // moveRight($gallery.find('img').width());
            moveRight($gallery.find('.swipe-item').width());
            if (curPos > 0) {
                // $('.img-prev').show('fast');
                $gallery.find('.img-prev').addClass('true');
            }
            if (curPos >= getMaxPos()) {
                // $(this).hide('fast');
                $(this).removeClass('true');
            }
        });
        $gallery.find('.img-prev').click(function() {
            // moveLeft($gallery.width());
            // moveLeft($gallery.find('img').width());
            moveLeft($gallery.find('.swipe-item').width());
            if (curPos < getMaxPos()) {
                // $('.img-next').show('fast');
                $gallery.find('.img-next').addClass('true');
            }
            if (curPos <= 0) {
                // $(this).hide('fast');
                $(this).removeClass('true');
            }
        });

        /* Touchfunctions */
        // var touchX;
        // $gallery.bind('touchstart mousedown', function(e) {
        //     console.log(e.type);
        //     e.preventDefault();
        //     touchX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        // });
        // var curX;
        // $gallery.bind('touchmove mousemove', function(e) {
        //     curX = e.originalEvent.touches ? e.originalEvent.touches[0].pageX : e.pageX;
        // });
        // $gallery.bind('touchend mouseup', function(e) {
        //     range = curX-touchX;
        //     if (range < -50) {
        //         moveRight(-range);
        //     } else if (range > 50) {
        //         moveLeft(range);
        //     }
        // });
    };
}).call(this);
