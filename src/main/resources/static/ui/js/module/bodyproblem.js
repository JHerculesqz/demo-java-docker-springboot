/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {

    var CBodyProblem = function () {
        // -1.CONST
        this.CONST_COMMAND = "看病。";
        // 0.data
        this.STATIC_INDEX = 0;
        this.STATIC_SUCCESS = "(⊙o⊙)…没学过，稍等，我马上学习";
        this.STATIC_OVER = "学习完毕";
        this.STATIC_FAIL = "不好意思出现故障了.";
        this.STATIC_WORKFLOW = ["您好，你想了解什么"];
        this.STATIC_USER;
        //1.init
        this.init = function (strMsg, oDelegateCallBackFunc) {
            if (this.STATIC_INDEX == 0) {
                //log->看病
                $.Record.append(strMsg, true);
                $.Record.append(this.STATIC_WORKFLOW[this.STATIC_INDEX], false);
                this.STATIC_INDEX++;
                //refresh
                $.Tools.refreshIframe();

            }
            else if (this.STATIC_INDEX == 1) {
                this._bodyProblem(strMsg);
                this.STATIC_INDEX = 0;
                if (oDelegateCallBackFunc) {
                    oDelegateCallBackFunc();
                }
            }
        };
        this._bodyProblem = function (strMsg) {
            var _this = this;
            //0.print record
            $.Record.append(strMsg, true);
            //1.post请求
            $.Tools.postAjax("/doctor/problem/queryProblem", {keyWord: strMsg}, function (oRes) {
                    //回调中刷新页面
                    if (oRes && oRes.answer == "learn") {
                        $.Record.append(_this.STATIC_SUCCESS, false);
                        _this.updateProblems(strMsg);
                    } else if (oRes) {
                        $.Record.append(oRes.answer, false);
                    }
                    else {
                        $.Record.append(_this.STATIC_FAIL, false);
                    }
                    $("#chatrecord").scrollTop($('#chatrecord')[0].scrollHeight);
                    $.Tools.refreshIframe();
                },
                function () {
                    $.Record.append(_this.STATIC_FAIL, false);
                    $.Tools.refreshIframe();
                });
        };
        this.updateProblems = function (strMsg) {
            var _this = this;
            $.Tools.postAjax("/doctor/problem/updateProblems", {keyWord: strMsg}, function (oRes) {
                    //回调中刷新页面
                    if (oRes) {
                        $.Record.append(oRes.answer, false);
                    }
                    else {
                        $.Record.append(_this.STATIC_FAIL, false);
                    }
                    $("#chatrecord").scrollTop($('#chatrecord')[0].scrollHeight);
                    $.Tools.refreshIframe();
                },
                function () {
                    $.Record.append(_this.STATIC_FAIL, false);
                    $.Tools.refreshIframe();
                });
        };
    }

    $.BodyProblem = new CBodyProblem();

})(jQuery)