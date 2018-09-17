import 'jquery'
import 'jquery-lazyload'
$(function () {
    alert(1212)
})

$(function () {
    $("img.lazy").lazyload(
        {
            placeholder : "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1315943296,4211134608&fm=15&gp=0.jpg",     //用图片提前占位
            effect : "fadeIn",    //载入使用何种效果,effect(特效),值有show(直接显示),fadeIn(淡入),slideDown(下拉)等,常用fadeIn
            threshold : 200,    //提前开始加载
            // event : "click",      //事件触发时才加载,event,值有click(点击),mouseover(鼠标划过),sporty(运动的),foobar(…).可以实现鼠标划过或点击图片才开始加载,后两个值未测试…
            failurelimit : 10,     //图片排序混乱时 ,
        }
    );
})