
function getOrderIndex(callback){
    
    chrome.storage.sync.get('OrderIdIndex', function(data) {
        
        if(data.OrderIdIndex){
            
            
            var fenId = "OrderIdAll_"+data.OrderIdIndex;
            console.log(fenId)
            callback(fenId);
        }else{
           callback(false);  
        }
        
    })

}



function getOrderIndexNum(callback){
    
    chrome.storage.sync.get('OrderIdIndex', function(data) {
        console.log(data);
        if(data.OrderIdIndex > 0){
            
            
            var fenId = data.OrderIdIndex;
         
            callback(fenId);
        }else{
           callback(false);  
        }
        
        
        
    })

}


function getLocAllOrderTbEnd(callback){
    
    getOrderIndexNum(function(num){
        
        var _tb = 'OrderIdAll_'+num;
                getLocAllOrderTb(_tb,function(data){
                    
                    if(data){
                         callback(data);
                    }
               
         });
        
    })
    
}



// 获取所有id表信息
function getLocAllOrderTb(fenId,callback){
    
    chrome.storage.sync.get(fenId, function(data) {
        
        if(data[fenId]){
         
            callback(data[fenId]);
        }else{
           callback(false);  
        }
        
    })
    
    
}

// 分表id index 减少

function fenIdJian(callback){

    getOrderIndexNum(function(num){
        
        console.log(num);
        
        var obj = {};
        
        
        
        if(num > 0 ){
           obj.OrderIdIndex = (num-1); 
           chrome.storage.sync.set(obj, function(data){                    
                     
                   callback(data) ;
                    
            }); 
        }else{
           callback(0); 
        }
        
        
        
        
        
    })
    

}

//删除订单号

function orderIdDel(call){
    
    getOrderIndex(function(fenID){
        
        chrome.storage.sync.get(fenID, function(data) {                               
                     
            console.log(data[fenID].length);
            if(data[fenID].length > 0){
                var _OrderIdAll = _.drop(data[fenID]); 
            
                var obj = {};    
                    obj[fenID] = _OrderIdAll; 
                  
                                
                chrome.storage.sync.set(obj, function(){
                       
                        call(_OrderIdAll);
                    
                }) 
                
            }else{
               fenIdJian(function(n){
                            
                                 
                            if(n== 0){
                                noCrawlOrder();
                                return;
                            } 
                            
                            routerUrl();
                    call(n)
                }); 
            }
             
            
          
        });

    })

}



 
 // 分表存储 id 索引
 
 function dBOrderTbIndex(id,info,tindex){ 
     
     var obj = {};
        obj[tindex] = [];
     chrome.storage.sync.get(tindex, function(data) {               
                    
        if(data[tindex]){            
                     
            obj[tindex] = data[tindex];
            obj[tindex].push(id)
            
        }else{
            console.log("2");
            obj[tindex].push(id);
         
        }   
        
        
        chrome.storage.sync.set(obj,function(data2){            
                    
                DBCreatTb(id,info,tindex)
                
         });      
                                     
                                
    });
    
 }
 
 // 创建表 存储信息
 
 function DBCreatTb(TBid,info,tindex){
     
     var obj = {};
     
     obj['tb'+TBid] = info;
     console.log(obj['tb'+TBid]);
        
    chrome.storage.sync.set(obj,function(data2){     
      
      orderIdDel(function(data){
            PL.open({
                content: '成功写入info',
                time: 2
            });  
            

            routerUrl();
           
       })
      
            
    });      
                                     
 }

//删除表索引

function DBOrderTbAllDel(call){
    chrome.storage.sync.remove('orderTbIndex', function(data) { 
        PL.open({
                content: '删除成功',
                time: 2
            });
    })
}
    
    
//  获取已经抓取的数量
function getAlreadyCrawNum(callback){
    
    var obj = {};
        obj.CrawNumOk = 0;
     chrome.storage.sync.get("CrawNumOk", function(data) {               
                    
        if(data.CrawNumOk){            
                     
          callback(data.CrawNumOk);
            
        }else{
           
          callback(obj.CrawNumOk);
        }   
            
    });
   
}
// 设置已经抓取的数量
function saveAlreadyCrawNum(){
    
    
    // getAlreadyCrawNum(function(data){
    //     var num = Number(data);
    //     var obj = {};
    //     obj.CrawNumOk = num+1;
    //     console.log(obj)
    //     chrome.storage.sync.set(obj,function(data2){     
            
    //         readerCrawlNum(num);
    //     });      
        
    // });
    
  var num =  PD(".order-tbody tr").length
    
    readerCrawlNum(num);
    
    
}
// 设置已经抓取的数量 init
function saveAlreadyCrawNumInit(){
        
        PD(".totalOrderOK").text("");
        PD(".order-tbody").html("");
        PD(".errorIdList").html("");
        
        var obj = {};
        obj.CrawNumOk = 0;

        chrome.storage.sync.set(obj,function(data2){     
              
        });      
}

// 保存总的订单号 
function saveTotalNum(num){
    
    var obj = {};
        obj.TotalNum = num;
    
    saveAlreadyCrawNumInit();
    
    chrome.storage.sync.set(obj,function(data2){     
            
           readerTotaNum(num)
    });     
    
}

getOrderIdAllstr("OrderIdAll_1");
function getOrderIdAllstr(str){
    //  OrderIdAll_1
    chrome.storage.sync.get(str, function(data) {                               
             
             console.log(data[str])           
    })
             
}