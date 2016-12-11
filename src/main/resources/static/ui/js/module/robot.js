/**
 * Created by Administrator on 2016/11/14.
 */
(function ($) {
    var CRobot = function () {
        this.speak = function (strInfo, oDelegateCallBackFunc) {
            var strAppKey = "64b4cfa386d142d6acd85170835f15c9";
            var strUserId = "JHercules";
            $.Record.append(strInfo, true);
            robotUtils.speak(strAppKey, strInfo, strUserId, function (result) {
                if (100000 == result.code) {
                    $.Record.append(result.text, false);
                }
                if (oDelegateCallBackFunc) {
                    oDelegateCallBackFunc();
                }
            });
        };
    }
    $.Robot = new CRobot();

})(jQuery)