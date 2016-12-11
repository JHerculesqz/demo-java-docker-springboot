/**
 * Created by Administrator on 2016/11/14.
 * 观察者模式
 * //回调函数
 function handle(e, a, b, c) {
    // `e`是事件对象，不需要关注
    console.log(a + b + c);
};

 //订阅
 $.subscribe("/some/topic", handle);
 //发布
 $.publish("/some/topic", ["a", "b", "c"]); // 输出abc


 $.unsubscribe("/some/topic", handle); // 退订

 //订阅
 $.subscribe("/some/topic", function (e, a, b, c) {
    console.log(a + b + c);
});

 $.publish("/some/topic", ["a", "b", "c"]); // 输出abc

 //退订（退订使用的是/some/topic名称，而不是回调函数哦，和版本一的例子不一样
 $.unsubscribe("/some/topic");
 */
(function ($) {

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

} (jQuery));

