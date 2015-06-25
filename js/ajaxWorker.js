/**
 * Created by denonzhu on 15/6/25.
 */
importScripts('underscore-min.js');
var xhr=(function(){
    var _buildFormData=function(data) {
        var fd = new FormData();
        _.each(data, function (v, k) {
            if (typeof v === 'object') {
                //TODO 文件上传处理
            } else {
                fd.append(k, v);
            }
        });
        return fd;
    };

    var ajax=function(url,data){
        var fd=_buildFormData(data);
       /* function uploadProgress(evt) {
         if (evt['lengthComputable']) {
         var percentComplete = Math.round(evt.loaded * 100 / evt.total);
         var data={
         state:1,
         percent:percentComplete
         };
         self.postMessage(data);
         }
         }*/
        /**
         * 成功
         * @param evt
         */
        function uploadComplete(evt) {
            var data ={
                state:2,
                data:JSON.parse(evt.target.responseText)

            };
            self.postMessage(data);
        }
        /**
         * 失败回调
         * @param evt
         */
        function uploadFailed(evt) {
            var data ={
                state:0,
                data:evt
            };
            self.postMessage(data);
        }

        var xhr = new XMLHttpRequest();
        //xhr.upload.addEventListener("progress", uploadProgress, false);
        xhr.addEventListener("load", uploadComplete, false);
        xhr.addEventListener("error", uploadFailed, false);
        xhr.open("POST", url);
        xhr.setRequestHeader("Accept", "application/json");
        xhr.send(fd);
    };

    return {
        ajax:ajax
    }
})();

self.onmessage=function(e) {
    var data = e.data;
    xhr.ajax(data.url,data.data);
};
