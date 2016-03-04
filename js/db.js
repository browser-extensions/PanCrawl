
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
        
        if(data.OrderIdIndex){
            
            
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
        
        
        
        if(num >= 0 ){
           obj.OrderIdIndex = (num-1); 
           chrome.storage.sync.set(obj, function(data){                    
                     
                   callback(data) ;
                    
            }); 
        }else{
           callback(-1); 
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
                
            }
             
            
          
        });

    })

}



// 简化存储表
function  dBOrderIndexTbJian(){
    

    
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
    