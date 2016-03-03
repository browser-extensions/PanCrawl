// 
function getStorage(name){    
   return localStorage.getItem(name);
}

//去空格
function delHtmlTag(str)
{
    var str=str.replace(/<\/?[^>]*>/gim,"");//去掉所有的html标记
    var result=str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
    return  result.replace(/\s/g,"");//去除文章中间空格
}

function GetQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}

//停止
function stopCrap(){
    
    chrome.storage.sync.remove('sl',function(){
        PL.open({
            content: '暂停成功',
            time: 2
        });
    });
}


// 清除数据

function storageDel(info,call){
    chrome.storage.sync.remove(info, function(data) {                               
             if(call){
                 call(data);
             }   
                                
    });
}


//list
function DBinfoList(_tb,callback){
          
    chrome.storage.sync.get(_tb, function(d) { 
                             
           callback(d[_tb]);                       
                     
    })

}

//clearDB();
 
 // 清除数据
 function clearDB(){
     chrome.storage.sync.clear( function(data) { 
        console.log(data);
     
        PD(".order-tbody").html('');
        PL.open({
                content: '清除成功',
                time: 2
        });
            

    })
 }


// url错误提示
function getSetUrlError(){
  
     PL.open({
            content: '地址错误',
            title: ""
        });
    
}


function isOrderNull(){
    var _host = window.location.hostname;
    
    var  mmsg;  
   
   
   
   if(_host == "trade.tmall.com"){
          mmsg = tmallElement();
     }else{
          mmsg = taobaoElement();
    }
    
    if(mmsg.Ycode == 0 || mmsg.Ycode == "0"){
           
           orderIdDel(function(data){
                PL.open({
                    content: '抓取失败',
                    time: 2
                });  
            
           
            })
           
           
     
      return false;  
       
    }
   
   
   return mmsg;
    
}












