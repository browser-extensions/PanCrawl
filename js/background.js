// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "您好"}, function(response) {
//     console.log(response.farewell);
//   });
// });


// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });

// chrome.runtime.onConnect.addListener(function(port) {
//     console.assert(port.name == "yisheng");
//     port.onMessage.addListener(function(msg) {
//       if (msg.joke == "Knock knock")
//         port.postMessage({question: "Who‘s there?"});
//       else if (msg.answer == "Madame")
//         port.postMessage({question: "Madame who?"});
//       else if (msg.answer == "Madame... Bovary")
//         port.postMessage({question: "I don‘t get it."});
//    });
//  });

// window.onload = function(){
//    chrome.tabs.query(
//       {active: true, currentWindow: true}, 
//       function(tabs) {
//             chrome.tabs.sendMessage(
//               tabs[0].id, 
//              {greeting: "startInfo"}, 
//              function(response) {
//                  alert(response.farewell)
                  
//          });
//     }); 
// }




// chrome.tabs.query(
//      {active: true, currentWindow: true}, 
//      function(tabs) {
//            var port = chrome.tabs.connect(
//              tabs[0].id, 
//              {name: "yisheng"}
//          );
//  });







// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	if(request.type!=="cnblog-article-information")
// 		return;
// 	articleData = request;
// 	articleData.firstAccess = "获取中...";
// 	alert(articleData.title);
// });




//抓去数据写入

// function postOrderInfo(msdata){
   
//    var info = {
//         uName : msdata.uName,
//         Ocode : msdata.Ocode,
//         Ycode : msdata.Ycode,
//         Zcode : msdata.Zcode,
//         UMsg  : msdata.UMsg,
//         Ycop  : msdata.Ycop
//    };   
    
//    var  obj = {};  
   
   

       
//     chrome.storage.sync.get('orderInfoAll', function(data) {               
                    
//         if(data.orderInfoAll){  
//                 console.log(data.orderInfoAll.length);          
//                 console.log('追加');
//                 obj.orderInfoAll = data.orderInfoAll;          
//                 obj.orderInfoAll.push(info);    
                
//             }else{
//                 obj.orderInfoAll = [];          
//                 obj.orderInfoAll.push(info);     
//                 console.log('初始');   
//             }   
            
//         chrome.storage.sync.set(obj,function(data2){            
//                 PL.open({
//                     content: '成功写入',
//                     time: 2
//                 });
//             })
                                        
                                    
//         });
       
       
    
// }


// chrome.storage.sync.get('orderInfoAll', function(data) {
            
//             console.log(data.orderInfoAll);                                     
                            
// });


// // 获取输入的订单号
// function getOrderIdAll(){
//     chrome.storage.sync.get('OrderIdAll', function(data) {                                
//         if(data){
//             return data.OrderIdAll;               
//         }
//         return false; 
                                                             
//    });
// }


//  DBOrderInfoTbAll()

// 遍历所有关联 表信息

// function DBOrderInfoTbAll(){
    

//     var obj = {},
//         infoall = [];
        
        
//       DBOrderTbAll(function(data){
//          console.log(data); 
//         function processNext(copiedData){
//             var _tb,data= copiedData.shift();
//             if(data){
//                 _tb = 'tb'+data;
//                 DBinfoList(_tb,function(data){
//                      infoall.push(data);
//                     //  console.log(data);
//                      processNext(copiedData);  
//                 });
//             }else{
              
//                 readerList(infoall) 
//                  //callback(infoall);
//             }
            
//         }
//         if(data){
//              processNext(data.slice(0));
//         }
//     })
          
      
  
// }


// 获取 所有表 Index

// function DBOrderTbAll(call){
    
//     var arr = [];
    
//     getOrderIndexNum(function(num){
        
//         // for(var i=num;i>=0;i--){
            
//             var fenId = 'orderTbIndex_'+num;
            
//             console.log(fenId)
            
//             chrome.storage.sync.get(fenId, function(data) { 
//                     if(data[fenId]){
                        
//                         console.log(data[fenId]);
                        
                     
//                         arr.push(data[fenId])
//                     }
                    
//             })
 
//         // }

//         call(arr);
//     })
    
// }

// 获取 所有表

// function DBOrderTbAll(call){
    
//     chrome.storage.sync.get('orderTbIndex', function(data) { 
//         if(data.orderTbIndex){
            
//             console.log(data.orderTbIndex);
            
//             call(data.orderTbIndex);

//         }else{
//             call(false);
//         }
        
//     })

// }


// DBOrderTbAllDel();




// 获取本地所有订单号
function getLocAllOrderId3(callback){
    
   var obj = {},
        infoall = [];
        
        
      getOrderIndexNumArr(function(data){
        
        function processNext(copiedData){
            var _tb,data= copiedData.shift();
            
           
            
            if(data){
                _tb = 'OrderIdAll_'+data;
                getLocAllOrderTb(_tb,function(data){
                    if(data){
                         infoall.push(data);
                    }
                    
                     processNext(copiedData);  
                });
            }else{
              
                // readerList(infoall) 
                 callback(infoall);
            }
            
        }
        if(data){
             processNext(data.slice(0));
        }
    })
        
};


function getLocAllOrderId2(callback){
    

    var obj = {},
        infoall = [];
        
        
      getOrderIndexNumArr(function(data){
         console.log(data); 
        function processNext(copiedData){
            var _tb,data= copiedData.shift();
            if(data){
                _tb = 'tb'+data;
                getLocAllOrderTb(_tb,function(data){
                     infoall.push(data);
                    //  console.log(data);
                     processNext(copiedData);  
                });
            }else{
              
                readerList(infoall) 
                 //callback(infoall);
            }
            
        }
        if(data){
             processNext(data.slice(0));
        }
    })
          
      
  
}



function getOrderIndexNumArr(callback){
    
    chrome.storage.sync.get('OrderIdIndex', function(data) {
        
        if(data.OrderIdIndex){
            
            var arr = [];
            var fenId = data.OrderIdIndex+1;
            
            
            for(var i =1;i<=fenId;i++){
                arr.push(i.toString());
            }
            
         
            callback(arr);
        }
        
         callback(false);
        
    })

}