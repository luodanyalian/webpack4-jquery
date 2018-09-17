 import '../utils/jsapi.js'
/**
 * [initVideo description]
 * @param  {[type]} vid     [优酷视频vid]
 * @param  {[type]} el [视频容器id]
 * @param  {[type]} btnplay [播放按钮id]
 * @param  {[type]} poster  [视频封面图片id]
 * @return {[type]}         [description]
 */
 export function initVideo(param) {
     var youkuplayer = document.getElementById(param.el);
     var play = document.getElementById(param.btnplay);
     var poster = document.getElementById(param.poster);
     play.addEventListener("click", function() {
         poster.style.display = "none";
         play.style.display = "none";
          var player = new YKU.Player(param.el, {
             styleid: '0',
             autoplay: true,
             client_id: '5c30db50b42ae8c4',
             vid: param.vid,
             newPlayer: true
         })
     }, false);
 }
 