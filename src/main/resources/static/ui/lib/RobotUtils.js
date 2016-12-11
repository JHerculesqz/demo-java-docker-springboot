/**
 * Created by JHercules on 2016/11/7.
 */
function RobotUtils(){
    //#region speak

    this.speak = function (strAppKey, strInfo, strUserId, oCallback) {
        var oParams = {
            key: strAppKey,
            info: strInfo,
            userid: strUserId
        };
        $.post("http://www.tuling123.com/openapi/api",oParams,function(result){
            oCallback(result);
        });
    };

    //#endregion
}
var robotUtils = new RobotUtils();