// 获取数据

function storageGet(info,call){
    chrome.storage.sync.get(info, function(data) {                               
                     
             call(data);                   
    });
}

//  获取 帐号名称
function getSetUnameF(callback){
    
    chrome.storage.sync.get('setUname', function(data) { 
        
        if(data.setUname){
            callback(data.setUname);
        }else{
            callback(false);
        }

    })   
}


//  获取 抓取间隔时间
function getSetTimeoutF(callback){
    
    chrome.storage.sync.get('setTimeout', function(data) { 
        
        if(data.setTimeout){
            callback(data.setTimeout);
        }else{
            callback(10000);
        }

    })   
}


// 获取 账户类型

function getSetNumberTypeF(callback){
    chrome.storage.sync.get('NumberType', function(data) { 
        
        if(data.NumberType){
            callback(data.NumberType);
        }else{
              callback(false);
        }
        
      
    })    
}


// 获取 订单号地址

function getSetUrl(callback){
    
   
    
    chrome.storage.sync.get('getUrl', function(data) { 
        
        if(data.getUrl){
            callback(data.getUrl);
        }else{
             callback(false);   
        }
        
       
    })    
}

 
// 获取 订单号提交地址

function getSetPostUrl(callback){
    chrome.storage.sync.get('postUrl', function(data) { 
        
        if(data.postUrl){
              callback(data.postUrl);
          
        }else{
             callback(false);   
        }
     
    })    
}