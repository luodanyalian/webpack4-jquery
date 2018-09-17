/**
 * [myalert description]
 * @param  {[string]} showel [弹框el]
 * @param  {[array]} close  [关闭弹框el]
 * @param  {[string]} btnshow  [显示弹框el]
 * @return {[type]}        [description]
 */
export function myalert(btnshow, showel, close) {
    $(btnshow).click(() => {
    	$('html,body').addClass('ovfHiden')
        $(showel).show();
    })
    $.map(close, function(item, index) {
        $(item).click(() => {
        	$('html,body').removeClass('ovfHiden');
            $(showel).hide();
        })
    });
}