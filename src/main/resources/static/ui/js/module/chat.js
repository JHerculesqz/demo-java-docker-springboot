/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {
    var CChat = function () {
        this.STATIC_COMMAND = "";
        //init
        this.init = function (strMsg) {
            var _this = this;
            if (strMsg == "未获得识别结果...") {
                $.Tools.refreshIframe();
                return;
            }
            $("#iptbox").val(strMsg);
            //factory
            if (strMsg == $.Reg.CONST_COMMAND || _this.STATIC_COMMAND == $.Reg.CONST_COMMAND) {
                _this.STATIC_COMMAND = $.Reg.CONST_COMMAND;
                $.Reg.init(strMsg, function () {
                    _this.STATIC_COMMAND = "";
                });

            }
            else if (strMsg == $.Login.CONST_COMMAND || _this.STATIC_COMMAND == $.Login.CONST_COMMAND) {
                _this.STATIC_COMMAND = $.Login.CONST_COMMAND;
                $.Login.init(strMsg, function () {
                    _this.STATIC_COMMAND = "";
                });
            }
            else if (strMsg == $.BodyProblem.CONST_COMMAND || _this.STATIC_COMMAND == $.BodyProblem.CONST_COMMAND) {
                _this.STATIC_COMMAND = $.BodyProblem.CONST_COMMAND;
                $.BodyProblem.init(strMsg, function () {
                    _this.STATIC_COMMAND = "";
                });
            }
            else {
                $.Robot.speak(strMsg,function () {
                    $.Tools.refreshIframe();
                    $("#chatrecord").scrollTop($('#chatrecord')[0].scrollHeight);
                });
            }

        }
    }

    $.Chat = new CChat();

})(jQuery)