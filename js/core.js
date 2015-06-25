/**
 * Created by denonzhu on 15/6/25.
 */
window.Core = Core = {};
Core.Version = '1.0';
Core.Server || (Core.Server = {});
Core.AjaxWorker || (Core.AjaxWorker=new Worker('js/ajaxWorker.js'));
Core.Server = (function () {
    var _get, _ajaxCb;
    _ajaxCb = function (data, succCb, failCb) {
        switch (data.state) {
            case 0:
                failCb(data.data);
                break;
            case 1:
                //正在传送状态
                console.log(data.percent);
                break;
            case 2:
                succCb(data.data);
                break;
            default :
                break;
        }
    };

    _get = function (url, data, succCb, failCb) {
        Core.AjaxWorker.onmessage = function (e) {
            var data = e.data;
            _ajaxCb(data,succCb,failCb);
        };
        Core.AjaxWorker.postMessage({url: url, data: data});
    };
    return {
        get: _get
    }
})();
