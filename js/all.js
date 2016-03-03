
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

// // 获取输入的订单号
// function getOrderIdAll(){
//     chrome.storage.sync.get('OrderIdAll', function(data) {                                
//         if(data){
//             return data.OrderIdAll;               
//         }
//         return false; 
                                                             
//    });
// }


//获取跳转的url
function openTaoBaoUrl(ID){
   var url = 'https://buyertrade.taobao.com/trade/detail/trade_item_detail.htm?spm=a1z09.2.0.0.Sx0xKe&bizOrderId='+ID;   
   return url;    
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

function saveOrderIdAll(bizOrderIdAll){
    
     var obj = {};
               
    obj.OrderIdAll = _.compact(bizOrderIdAll);
    
    console.log(obj.OrderIdAll);
    
    if(obj.OrderIdAll.length > 0){
        chrome.storage.sync.set(obj, function(){
                     
                     
                     PL.open({
                        title: '保存订单号成功',
                        content: '是否开始抓取第一个订单详细页面',
                        btn: ['嗯', '不要'],
                        yes: function(index){
                            
                            PL.closeAll();                         
                                    
                            chrome.storage.sync.set({'sl': '开始'},function(){ })
                            
                            window.open(openTaoBaoUrl(obj.OrderIdAll[0]));
                                     
                            
                            return;
                                          
                        }
                    });
                    
        }); 
        
    }else{
      
      PL.open({
        title: '',
        content: '该账户没有订单了'
     });
      
        
    }
    
    
    
    
}


//抓去数据写入

function postOrderInfo(msdata){
   
   var info = {
        uName : msdata.uName,
        Ocode : msdata.Ocode,
        Ycode : msdata.Ycode,
        Zcode : msdata.Zcode,
        UMsg  : msdata.UMsg,
        Ycop  : msdata.Ycop
   };   
    
   var  obj = {};  
   
   

       
    chrome.storage.sync.get('orderInfoAll', function(data) {               
                    
        if(data.orderInfoAll){  
                console.log(data.orderInfoAll.length);          
                console.log('追加');
                obj.orderInfoAll = data.orderInfoAll;          
                obj.orderInfoAll.push(info);    
                
            }else{
                obj.orderInfoAll = [];          
                obj.orderInfoAll.push(info);     
                console.log('初始');   
            }   
            
        chrome.storage.sync.set(obj,function(data2){            
                PL.open({
                    content: '成功写入',
                    time: 2
                });
            })
                                        
                                    
        });
       
       
       
    
    
}


// chrome.storage.sync.get('orderInfoAll', function(data) {
            
//             console.log(data.orderInfoAll);                                     
                            
// });




// 设置数据
function storageSet(obj,call){
    chrome.storage.sync.set(obj,function(data){
        if(call){
            call()
        }else{
            return data;
        }
    })
}

// 获取数据

function storageGet(info,call){
    chrome.storage.sync.get(info, function(data) {                               
                     
             call(data);                   
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

//删除订单号

function orderIdDel(call){
    
    chrome.storage.sync.get('OrderIdAll', function(data) {                               
                     
             
        var _OrderIdAll = _.drop(data.OrderIdAll); 
        
        var obj = {};    
            obj.OrderIdAll = _OrderIdAll;                
            chrome.storage.sync.set(obj, function(){
                
                call(_OrderIdAll);
            
        }) 
          
 });
 
}
 

 
 // 分表存储 id 索引
 
 function dBOrderTbIndex(id,info){ 
     
     var obj = {};
        obj.orderTbIndex = [];
     chrome.storage.sync.get('orderTbIndex', function(data) {               
                    
        if(data.orderTbIndex){            
            
          
            obj.orderTbIndex = data.orderTbIndex;
            obj.orderTbIndex.push(id)
            
        }else{
            console.log("2");
            obj.orderTbIndex.push(id);
         
        }   
        
        
        chrome.storage.sync.set(obj,function(data2){            
                    
                DBCreatTb(id,info)
                
         });      
                                     
                                
    });
    
 }
 
 // 创建表 存储信息
 
 function DBCreatTb(TBid,info){
     
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



//路由转发

function routerUrl(){
     
    chrome.storage.sync.get('OrderIdAll', function(data) {  
                if(data.OrderIdAll){
                    console.log(data);
                    var _code = _.head(data.OrderIdAll);
                    
                    if(_code){
                        
                        // 获取设置时间
                        getSetTimeoutF(function(dTime){
                            console.log(dTime);
                            setTimeout(function(){                     
                                locationUrlGo(_code);       
                            },dTime)  
                            
                        })
                        
                         
                    }
                    
                }
                
             })
    
    
}


// 获取 所有表

function DBOrderTbAll(call){
    
    chrome.storage.sync.get('orderTbIndex', function(data) { 
        if(data.orderTbIndex){
            
            console.log(data.orderTbIndex);
            
            call(data.orderTbIndex);

        }else{
            call(false);
        }
        
    })

}


// DBOrderTbAllDel();
//删除表索引

function DBOrderTbAllDel(call){
    chrome.storage.sync.remove('orderTbIndex', function(data) { 
        PL.open({
                content: '删除成功',
                time: 2
            });
    })
}

 DBOrderInfoTbAll()

// 遍历所有关联 表信息

function DBOrderInfoTbAll(){
    

    var obj = {},
        infoall = [];
        
        
      DBOrderTbAll(function(data){
         console.log(data); 
        function processNext(copiedData){
            var _tb,data= copiedData.shift();
            if(data){
                _tb = 'tb'+data;
                DBinfoList(_tb,function(data){
                     infoall.push(data);
                     console.log(data);
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


//页面渲染

function readerList(data){
   console.log(data);
   
   var str = '';
   
   for(var i=0;i<data.length;i++){
       
   
         str = str + '<tr>'+
                    '<td>'+ data[i].Ocode +'</td>'+
                    '<td>'+ data[i].Zcode +'</td>'+
                    '<td>'+ data[i].uName +'</td>'+
                    '<td>'+ data[i].UMsg +' </td>'+
                    '<td>'+ data[i].Ycode +'</td>'+
                    '<td>'+ data[i].Ycop +'</td>'+
               '</tr>';
       
       
   }
   
   PD('.order-tbody').html(str);
     
}



//list
function DBinfoList(_tb,callback){
          
    chrome.storage.sync.get(_tb, function(d) { 
                             
           callback(d[_tb]);                       
                     
    })

}

//

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
 

 
 //  设置 帐号名称
function setUnameF(name){
    var obj = {};
    obj.setUname = name;
    chrome.storage.sync.set(obj, function(data) { 
        
        
    })   
    
}




 
//  获取 抓取间隔时间
function getSetTimeoutF(callback){
    
    chrome.storage.sync.get('setTimeout', function(data) { 
        
        if(data.setTimeout){
            callback(data.setTimeout);
        }else{
            callback(5000);
        }

    })   
}
 

 
 //  设置 抓取间隔时间
function setTimeoutF(time){
    var obj = {};
    obj.setTimeout = time;
    chrome.storage.sync.set(obj, function(data) { 
        
 
    })   
    
}

// 获取 账户类型

function getSetNumberTypeF(){
    chrome.storage.sync.get('NumberType', function(data) { 
        
        if(data.setTimeout){
            return data.setNumberType;
        }
        
        return false;   
    })    
}


// 设置 账户类型
function setNumberTypeF(ntype,callback){
    var obj = {};
    obj.NumberType = ntype;
    chrome.storage.sync.set(obj, function(data) { 
        
        callback();
        
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


//提交 api 接口 订单信息 数据

function postOrderInfoServer(data){
    

// orderjson:{"OrderId":"1558627715115510","PayId":" 2016011521001001970235003919","CompanyName ":"—","PackageNum ":"919627729837","BuyMessage ":""}
    

var obj = {"OrderId": data.OrderId,"PayId":data.PayId,"CompanyName":data.CompanyName,"PackageNum":data.PackageNum, "BuyMessage":data.BuyMessage};
 console.log(obj)
    
    getSetPostUrl(function(geturl){
        
        if(geturl){
           PD.ajax({
            type: "POST",
            url: geturl,
            data: "orderjson="+ JSON.stringify(obj),
            cache: "false",
    
            success: function(msg){
                console.log(msg );
            },
            error:function (result, status) {
                //处理错误
                console.log(result);
                console.log(status);
            }
            }); 
        }
        
        
        
        
    })
    
    

}


// url错误提示
function getSetUrlError(){
  
     PL.open({
            content: '地址错误',
            title: ""
        });
    
}



//获取 api 接口 订单号 数据

function getServeApiCode(name){
    
    getSetUrl(function(getUrl){
        if(getUrl){
            
           PD.ajax({
                type: "get",
                url: getUrl,
                data: "c="+name,
                cache: "false",               
                success: function(msg){
                  
                   
                    setStorage("orderId",_.toString(msg),function(data){
                        
                        console.log(data);
                        
                        var arr = JSON.parse(data);
                        
                        console.log(arr)
                        
                        
                    }) 
                    
                    
                    
                    // if(msg.length>0){
           
                    //     console.log(_.toArray(msg));
                        
                    // //    setStorage("orderId",_.toString(msg)) 
                        
                    //     // saveApitOrderId(data);
                        
                      
                        
                    // }else{
                    //     alert("获取订单失败");
                    // }
                    
            
                    },
                    error:function (result, status) {
                        //处理错误
                        console.log(result);
                    }
                }); 

        }else{
            
            
            getSetUrlError();
            
        }
        
        
    })
    
    

}


// 保存 api 接口 获取的订单号

function saveApitOrderId(data){
    
    var dataL =  data.length > 0;
    
    if(!dataL){
        return;
    }
    
    var arr = [];
    
    for(var i=0;i<data.length;i++){
        
        if(data[i].TaobaoOrderId.length > 5){
           arr.push(data[i].TaobaoOrderId);
        }
        
        
    }
    
    
    saveOrderIdAll(arr);
    
    console.log(arr);

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


// 
function getStorage(name){    
   return localStorage.getItem(name);
}

// 
function setStorage(name,val,callback){    
   localStorage.setItem(name,val);
   callback(getStorage(name))
}