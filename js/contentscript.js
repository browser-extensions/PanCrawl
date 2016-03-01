 var num = new Date().getTime();

console.log("已经载入1P..");
PD.getScript("//nnn.li/panli.js?v=panli"+num+"", function(data, status, jqxhr) {

    console.log("已经载入2P.."); 
    
    PD(function(){  
                
                var _hostName = window.location.hostname;           
                
                
                startL();
                
                                
                var  start =  chrome.storage.sync.get(["sl"],function(date){
                    console.log(date.sl)
                    if(date.sl){
                        sedPosMsg();
                    }
                
                })   
    
    
    });
 
});



// 监听入口
function startL(){    
    
    chrome.runtime.onMessage.addListener(
      function(request, sender, sendResponse) { 
          
          if(request.greeting == "reload"){
                window.location.href = window.location.href;  
                sendResponse({farewell: "清除成功"});       
                return;
            }
          
               
            if (request.greeting == "startInfo"){
                sendResponse({farewell: "开始执行"});            
                chrome.storage.sync.set({'sl': '开始'},function(){ window.location.href = window.location.href;})
            }

     });
}


function sedPosMsg(){ 
   
     if(isOrderNull() == false){
        
      
          routerUrl();
         
         return
     }  
     
     var mmsg = isOrderNull();
     
    chrome.runtime.sendMessage(mmsg);
 
  
    chrome.storage.sync.get('OrderIdAll', function(data) {                                
       
       if(data.OrderIdAll){
            
            if(data.OrderIdAll.length == 0){
                 
                chrome.storage.sync.remove(["sl"],function(){
                        PL.open({
                            content: '没有需要抓取的订单了',
                            time: 10
                        });
                })   
                 
                 
                alert("没有需要抓取的订单了");
                 
                
            }
            
            var _code = data.OrderIdAll[0];
           
            if(_code){
                dBOrderTbIndex(_code,mmsg);
            }        
            
            
           
        }
     
                                                             
    });
    

}
     
   


   
// 跳转 订单详细 url
function locationUrlGo(id){  
    
    window.location.href = openTaoBaoUrl(id);
}    
   

   
     
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
         
         
   
function setStorage(items,call){
    chrome.storage.StorageArea.set(items, function(){
        if(call){
            call(); 
        }
    }); 
}

// 天猫页面数据
function tmallElement(){

    var uname = PD.trim(PD('.address-detail').text()).split('，')[0];
    
    var msg = {
        type: "taobao-information",           
        uName : uname,
        Ocode : GetQueryString('biz_order_id'),
        Ycode : PD(".trade-detail-logistic").attr('data-mail-no'),
        Zcode : PD('.small-drop-down tr').text().replace(/\n/g,'||').replace(/\s/g,"").split('||')[2],
        UMsg : PD('.message-detail').text(),
        Ycop : PD(".trade-detail-logistic").attr('data-company-name')
     };
       
        
      return msg;
}



// 淘宝页面数据
function taobaoElement(){

    var uname = PD.trim(PD('.addr_and_note').find('dd').text()).split('，')[0];
    
   var OcodeT = YcodeT = ZcodeT = UMsgT = YcopT = 0;
    
    var OcodeLen = PD('.misc-info').text().length;
    if(OcodeLen > 0){
        OcodeT = PD.trim(PD('.misc-info').text()).replace(/\n/g,'||').split('||')[4],
        YcodeT = PD.trim(PD('.logistics-id').text()),
        ZcodeT = PD.trim(PD('.misc-info').text()).replace(/\n/g,'||').split('||')[8],
        UMsgT = PD('#J_ExistMessage').text(),
        YcopT = PD.trim(PD('.logistics-company').text());
    }
    
    var msg = {
        type: "taobao-information",           
        uName : uname,
        Ocode : OcodeT,
        Ycode : YcodeT,
        Zcode : ZcodeT,
        UMsg : UMsgT,
        Ycop : YcopT
     };
       
        
     return msg;
}



 

