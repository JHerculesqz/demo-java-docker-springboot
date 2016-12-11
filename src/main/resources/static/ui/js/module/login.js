/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {

    var CLogin = function () {
        // -1.CONST
        this.CONST_COMMAND = "登录。";
        // 0.data
        this.STATIC_INDEX = 0;
        this.STATIC_SUCCESS = "您已登录成功";
        this.STATIC_FAIL = "登录失败，请重新登录";
        this.STATIC_WORKFLOW = ["您好，请问您叫什么"];
        this.STATIC_USER;
        //1.init
        this.init = function (strMsg, oDelegateCallBackFunc) {
            if (this.STATIC_INDEX == 0) {
                //log->登录
                $.Record.append(strMsg, true);
                $.Record.append(this.STATIC_WORKFLOW[this.STATIC_INDEX], false);
                this.STATIC_INDEX++;
                //refresh
                $.Tools.refreshIframe();

            }
            else if (this.STATIC_INDEX == 1) {
                this._login(strMsg);
                this.STATIC_INDEX = 0;
                if (oDelegateCallBackFunc) {
                    oDelegateCallBackFunc();
                }
            }
        };
        this._login = function (strMsg) {
            var _this = this;
            //0.print record
            $.Record.append(strMsg, true);
            //1.post请求
            $.Tools.postAjax("/doctor/login/queryUserInfo", {name: strMsg}, function (oRes) {
                    //回调中刷新页面
                    if (oRes) {
                        _this.STATIC_USER = oRes;
                        $.Record.append(_this.STATIC_SUCCESS, false);
                    } else {
                        $.Record.append(_this.STATIC_FAIL, false);
                    }
                    $.Tools.refreshIframe();
                },
                function () {
                    $.Record.append(_this.STATIC_FAIL, false);
                    $.Tools.refreshIframe();
                });
        };
    }

    $.Login = new CLogin();
})(jQuery)