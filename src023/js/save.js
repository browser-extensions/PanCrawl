

// 设置 form 配置
function setFormALl(setData,callback){
    
    // var setData = {name:_uname,time:_setTime,type:_Type,getUrl:_getUrl,postUrl:_postUrl};
    
    var obj = {};
    obj.setUname = setData.name;
    obj.setTimeout = setData.time;
    obj.NumberType = setData.type;
    obj.getUrl = setData.getUrl;
    obj.postUrl = setData.postUrl;
    
    console.log(obj);
    
    chrome.storage.sync.set(obj, function(data) { 
        
        callback();
        
    })
}


// 添加订单号
function addOrderCode(){
    
    var textartD = '<div class="input-field col s12">'+
          '<textarea id="textarea1" class="textarea"></textarea>'+
          ''+
        '</div><button class="waves-effect waves-light btn closediy">确定</button><span> &nbsp;&nbsp;&nbsp;只允许输入数字,并用逗号分割</span>';
    
    
    var pagei = PL.open({
        type: 1, //1代表页面层
        content: textartD,
        style: 'width:660px; height:400px; border:none;',
        success: function(oPan){
            var cla = 'getElementsByClassName';
            oPan[cla]('closediy')[0].onclick = function(){
                
                var codeALl = PD.trim(oPan[cla]('textarea')[0].value).replace(/\s/g,"").replace(/，/g,",").replace(/\s/g,"").replace(/\n/g,"");      
                
                var reg = /^(\d+,?)+$/;
              
                
                if(!reg.test(codeALl)){
                    
                    PL.open({
                        title: '错误',
                        content: '输入单号格式不正确'
                    });
                    
                    return; 
                }
                
            
               var bizOrderIdAll = codeALl.split(',');
                
               saveOrderIdAll(bizOrderIdAll);
                
                
            }
        }
    });
}



// 保存 api 接口 获取的订单号

function saveApitOrderId(data){
    
    var dataL =  data.length > 0;
    
    if(!dataL){
        return;
    }
    
    var arr = [];
    
    for(var i=0;i<data.length;i++){
        
        if(data[i].TaobaoOrderId.length == 16){
           
           var regId = data[i].TaobaoOrderId.replace(/，/g,',');
           
           regId = _.split(regId,',');
           
           if(_.isObject(regId)){
               
               
               for(var j=0;j<regId.length;j++){
                 
                 arr.push(regId[j]); 
               
               }
               
               
           }else{
               
              arr.push(regId); 
           }
           
           
        }
        
    }
    
    
    saveOrderIdAll(arr);
    
    // console.log(arr);

}


// 保存订单信息
function saveOrderIdAll(bizOrderIdAll){
    
     var obj = {},
          ind = 50;
     
     var Thread = 2;  //打开浏览器线程        
    
    
    var OrderIdAll = _.compact(bizOrderIdAll),
        legt = OrderIdAll.length,
        ltb = Math.ceil(legt/ind);
        
        saveTotalNum(legt)
        
        
        
        obj.OrderIdIndex = ltb;
        
        // console.log(obj.OrderIdIndex);
        
    for(var i=1;i<=ltb;i++){
      
        var arr = "OrderIdAll_"+i;
        
        
        obj["OrderIdAll_"+i] = [];
        
        
        for(var j = (i-1)*ind;j<(i)*ind;j++){
            
            if(OrderIdAll[j]){
              obj["OrderIdAll_"+i].push(OrderIdAll[j])  
            }
           
        }
        
        console.log(obj["OrderIdAll_"+i])
        
        
    }
    
    
    
    
    syncSetFenPian(obj,"OrderIdAll_"+ltb);
 
    
    if(OrderIdAll.length > 0){
        
       
        
    }else{
      
      PL.open({
        title: '',
        content: '该账户没有订单了'
     });
      
        
    }
    
    
}


// 分片保存id
function syncSetFenPian(obj,ednTb){
    
    
    chrome.storage.sync.set(obj, function(){                    
                     
                     PL.open({
                        title: '保存订单号成功',
                        content: '是否开始抓取第一个订单详细页面',
                        btn: ['嗯', '不要'],
                        yes: function(index){
                            
                            PL.closeAll();                         
                                    
                            chrome.storage.sync.set({'sl': '开始'},function(){ })
                            
                            console.log(obj[ednTb])
                            
                            window.open(openTaoBaoUrl(obj[ednTb][0]));
                                     
                            
                            return;
                                          
                        }
                    });
                    
        }); 
}