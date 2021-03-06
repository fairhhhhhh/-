!(function(){
    var sajax = window.sajax = {}; //命名空间
        sajax.post = function(url,json,callback){
            // 兼容ie6
            if (window.XMLHttpRequest) {
                var xhr = new XMLHttpRequest();
            }else {
                var xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function(){
                if (xhr.readyState == 4) {
                    // 默认的初始值
                    var status = 0;
                    var data = null;
                    // 规定的状态
                    var statusData = {
                        status : status,
                        data : data
                    }
                    if (xhr.status >=200 && xhr.status < 300 || xhr.status == 304) {
                        statusData.data = xhr.responseText;
                        statusData.status = 1;
                        callback(statusData,null);
                    }else {
                        statusData.status = xhr.status;
                        callback(statusData,new Error("请求的文件发送错误"))
                    }
                }
            }
            var getData = sajax._json2string(json);
            xhr.open("post",url,true);
            xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xhr.send(getData);
        }

        // 把对象转化为字符串
        sajax._json2string = function(json){
            var arr = [];
            for(var k in json ){
                arr.push(k + "=" + json[k]);
            }
            return arr.join("&");
        }
}())