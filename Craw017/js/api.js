//获取 api 接口 订单号 数据

function getServeApiCode(name){
    
    getSetUrl(function(getUrl){
        if(getUrl){
            
           PD.ajax({
                type: "get",
                url: getUrl,
                data: "c="+name,
                cache: "false",
                dataType:"json",
                success: function(msg){
                    console.log( msg);
                    var data = eval(msg);
                    
                    PL.closeAll();
                    
                    
                    if(data.length>0){
                        console.log(data.length);
                        
                        saveApitOrderId(data);
                        
                        console.log(msg)
                        
                    }else{
                        alert("获取订单失败");
                    }
                    
            
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
                PL.open({
                     time: 2,
                     content: msg
                })
                saveAlreadyCrawNum(); 
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