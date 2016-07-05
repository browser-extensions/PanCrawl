



//获取跳转的url
function openTaoBaoUrl(ID){
   
   var urlA = [
       "https://buyertrade.taobao.com/trade/detail/trade_item_detail.htm?spm=a1z09.2.0.0.Sx0xKe&bizOrderId="
       
   ]
        
   var url = urlA[0]+ID;   
   return url;    
}


//路由转发

function routerUrl(){
     
     
    chrome.storage.sync.get('OrderIdIndex', function(data) {
        
        if(data.OrderIdIndex){
            
            console.log(data.OrderIdIndex)
            
            var fenId = "OrderIdAll_"+data.OrderIdIndex;
            
           
            
            routerUrlTwo(fenId)
            
        }
        
    })
     
}

//路由转发2
function routerUrlTwo(fenId){
    
    chrome.storage.sync.get(fenId, function(data) {  
                if(data[fenId]){
                   
                    var _code = _.head(data[fenId]);
                    
                    console.log(fenId);
                    
                    if(_code){
                        
                        
                        setTimeout(function(){                     
                                locationUrlGo(_code);       
                        },2000)  
                        
                        // 获取设置时间
                        // getSetTimeoutF(function(dTime){
                            
                        //     setTimeout(function(){                     
                        //         locationUrlGo(_code);       
                        //     },3000)  
                            
                        // })
                        
                         
                    }else{
                        
                        console.log("减少一个index表Rot2")
                
                        fenIdJian(function(n){
                            
                                 
                            if(n== 0){
                                noCrawlOrder();
                                return;
                            } 
                            
                            routerUrl();
                            
                           
                        });
                        
                        
                        
                    }
                    
                }
                
             })

}

   
// 跳转 订单详细 url
function locationUrlGo(id){  
    
    window.location.href = openTaoBaoUrl(id);
}    
   