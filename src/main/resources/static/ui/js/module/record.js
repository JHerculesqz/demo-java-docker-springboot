/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {
    var CRecord = function () {
        //0.msg tmpl
        this.STATIC_RECORD_TMPL = "<div class='{0}'>{1}</div>"
        //1.append
        this.append = function (strMsg, bQuestion) {
            var oRecordDiv = $("#chatrecord");
            //1.set class
            var strClass = "msgleft";
            if (bQuestion == true) {
                strClass = "msgright";
            }
            // 2.append msg to parent
            var strDivMsg = $.Tools.format(this.STATIC_RECORD_TMPL, strClass, strMsg);
            oRecordDiv.append($(strDivMsg));
        };

        //2.msgSend
        this.msgSend = function (strDivId, strMsg, bQuestion, oDelegateCallbackFunc) {
            var oRecordDiv = $("#" + strDivId);
            // 1append msg to parent
            var strDivMsg = $.Tools.format(this.STATIC_RECORD_TMPL, "msgright", strMsg);
            oRecordDiv.append($(strDivMsg));
            var strDivAnswerMsg = $.Tools.format(this.STATIC_RECORD_TMPL, "msgleft", strMsg);
            oRecordDiv.append($(strDivAnswerMsg));
            oRecordDiv.scrollTop(oRecordDiv[0].scrollHeight);
            if (oDelegateCallbackFunc) {
                oDelegateCallbackFunc();
            }
        };

    }

    $.Record = new CRecord();

})(jQuery)