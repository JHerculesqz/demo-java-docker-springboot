/**
 * Created by Administrator on 2016/11/13.
 */

/**
 * onload
 */
$(function () {
    $("#btnsend").on("click", function () {
        var strMsg=$("#iptbox").val();
        $.Chat.init(strMsg);
    });
});

/**
 * speechFromChild
 */
function speechFromChild(strMsg) {
    $.Chat.init(strMsg);
}