 var num = new Date().getTime();
 var pday = new Date().getDate();

 console.log("已经载入1P..");

var taojs = 'https://nnn.li/chrome/tao.js?v'+pday;

var panjs = "https://browser-extensions.github.io/PanCrawl/src/libs/panli.js";
//  PD.getScript("https://nnn.li/chrome/tao.js", function(data, status, jqxhr) {
// https://browser-extensions.github.io/PanCrawl/src/libs/panli.js

// PD.getScript(taojs, function(data, status, jqxhr) {

    PD.getScript(panjs, function(data, status, jqxhr) {

        // console.log("已经载入2PP.."); 

        PD(function() {
            getSetTimeoutF(function(dTime) {

                setTimeout(function() {

                    var _hostName = window.location.hostname;
                    startL();
                    var start = chrome.storage.sync.get(["sl"], function(date) {
                        console.log(date.sl)
                        if (date.sl) {
                            sedPosMsg();
                        }

                    })

                }, dTime);

            });

        });

    });
//  });



function appMain(){
     // console.log("已经载入2PP.."); 
        PD(function() {
            getSetTimeoutF(function(dTime) {

                setTimeout(function() {

                    var _hostName = window.location.hostname;
                    startL();
                    var start = chrome.storage.sync.get(["sl"], function(date) {
                        console.log(date.sl)
                        if (date.sl) {
                            sedPosMsg();
                        }

                    })

                }, dTime);

            });

        });

}


 // 监听入口
 function startL() {

     chrome.runtime.onMessage.addListener(
         function(request, sender, sendResponse) {

             if (request.greeting == "reload") {
                 window.location.href = window.location.href;
                 sendResponse({
                     farewell: "清除成功"
                 });
                 return;
             }


             if (request.greeting == "startInfo") {
                 sendResponse({
                     farewell: "开始执行"
                 });
                 chrome.storage.sync.set({
                     'sl': '开始'
                 }, function() {
                     window.location.href = window.location.href;
                 })
             }

         });
 }


 // 第1步
 function sedPosMsg() {

     if (isOrderNull() == false) {

         routerUrl();

         return
     }

     var mmsg = isOrderNull();

     chrome.runtime.sendMessage(mmsg);

     getOrderIndexNum(function(num) {
         console.log(num);

         if (num) {

             console.log(num);

             var fenId = "OrderIdAll_" + num;

             getFenPianId(fenId, mmsg, num);

         } else {

             alert("已经没有要抓取的订单了,请到后台清除数据，重新获取订单号继续抓取")
                 //  PL.open({
                 //      title: '',
                 //      content: ''
                 //  });
         }

     })

 }

 // 第2步
 // 分片查找id
 function getFenPianId(fenId, mmsg, tindex) {

     chrome.storage.sync.get(fenId, function(data) {

         if (data[fenId]) {

             if (data[fenId].length == 0) {

                 fenIdJian(function(n) {

                     if (n == 0) {
                         noCrawlOrder();
                         return;
                     }

                     routerUrl();

                     return;


                 });

             }

             var _code = data[fenId][0];

             if (_code) {
                 console.log(_code);
                 dBOrderTbIndex(_code, mmsg, 'orderTbIndex_' + tindex);
             }


         } else {
             PL.open({
                 content: '订单号未找到',
                 time: 10
             });

         }

     });


 }

 //没有需要抓取的订单了
 function noCrawlOrder() {

     chrome.storage.sync.remove(["sl"], function() {
         PL.open({
             content: '没有需要抓取的订单了',
             time: 10
         });
     })

     alert("没有需要抓取的订单了");

 }