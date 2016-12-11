/**
 * Created by Administrator on 2016/11/13.
 */
(function ($) {
    var CTools = function () {
        // 1.ajax
        this.postAjax = function (strUrl, oData, oDelegateSuccessFunc, oDelegateErrorFunc) {
            $.ajax({
                url: strUrl,
                contentType: "application/json",
                type: 'POST', //GET
                async: true,    //或false,是否异步
                data: JSON.stringify(oData),
                //timeout: 5000,    //超时时间
                dataType: 'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success: function (res) {
                    if (oDelegateSuccessFunc) {
                        oDelegateSuccessFunc(res);
                    }
                },
                error: function (xhr) {
                    if (oDelegateErrorFunc) {
                        oDelegateErrorFunc(xhr);
                    }
                }
            })
        };
        //2.string.format
        this.format = function () {
            if (arguments.length == 0)
                return null;
            var str = arguments[0];
            for (var i = 1; i < arguments.length; i++) {
                var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                str = str.replace(re, arguments[i]);
            }
            return str;
        };
        //3.刷新iframe页面
        this.refreshIframe = function () {
             $('#iframespeech').attr('src', $('#iframespeech').attr('src'));
            // $('#iframespeech')[0].contentWindow.start();
            $("#chatrecord").scrollTop($('#chatrecord')[0].scrollHeight);

        }
    }

    $.Tools = new CTools();

})(jQuery)