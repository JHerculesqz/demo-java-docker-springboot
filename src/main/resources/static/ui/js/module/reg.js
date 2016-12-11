/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {

    var CReg = function () {
        // -1.CONST
        this.CONST_COMMAND = "注册。";
        //0.index
        this.STATIC_INDEX = 0;
        //1.command
        this.STATIC_WORKFLOW = [
            {StepName: "您好，请问您叫什么?", StepData: "name"},
            {StepName: "您多大年纪?", StepData: "age"},
            {StepName: "您是男是女?", StepData: "sex"}];
        this.STATIC_SUCCESS = "已您注册成功";
        this.STATIC_FAIL = "注册失败，请重新注册";
        //2.data
        this.STATIC_DATA = {};
        //3.init
        this.init = function (strMsg, oDelegateCallBackFunc) {

            if (this.STATIC_INDEX == 0) {
                //log->reg
                $.Record.append(strMsg, true);
                $.Record.append(this.STATIC_WORKFLOW[this.STATIC_INDEX].StepName, false);
                //refresh
                this.STATIC_INDEX++;
                $.Tools.refreshIframe();

            }
            else if (this.STATIC_INDEX == this.STATIC_WORKFLOW.length) {
                this.STATIC_DATA[this.STATIC_WORKFLOW[this.STATIC_INDEX - 1].StepData] = strMsg;
                this._reg(strMsg);
                //callback
                if (oDelegateCallBackFunc) {
                    oDelegateCallBackFunc();
                }
            }
            else {
                //log->reg
                $.Record.append(strMsg, true);
                this.STATIC_DATA[this.STATIC_WORKFLOW[this.STATIC_INDEX - 1].StepData] = strMsg;
                $.Record.append(this.STATIC_WORKFLOW[this.STATIC_INDEX].StepName, false);
                this.STATIC_INDEX++;
                //refresh
                $.Tools.refreshIframe();
            }

        };
        this._reg = function (strMsg) {
            var _this = this;
            //0.print record
            $.Record.append(strMsg, true);
            //1.post请求
            $.Tools.postAjax("/doctor/login/saveUserInfo", _this.STATIC_DATA,
                function (oRes) {
                    //回调中刷新页面
                    if (oRes && oRes.name != "") {
                        $.Record.append(_this.STATIC_SUCCESS, false);
                    }
                    else {
                        $.Record.append(_this.STATIC_FAIL, false);
                    }
                    _this.STATIC_INDEX = 0;
                    _this.STATIC_DATA = {};
                    $.Tools.refreshIframe();
                },
                function () {
                    $.Record.append(_this.STATIC_FAIL, false);
                    _this.STATIC_INDEX = 0;
                    _this.STATIC_DATA = {};
                    $.Tools.refreshIframe();
                });
        };
    }

    $.Reg = new CReg();
})(jQuery)