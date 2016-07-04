
$(function () {
   
//开始
  $("#startId").on("click",function(){
     contentScript();
  });
  
//停止 
  $("#stopId").on("click",function(){
     stopCrap();
  });
//添加订单 
  $("#addOrderId").on("click",function(){
     addOrderCode();
  });
  
//获取订单号
  $("#getOrderId").on("click",function(){
     
     PL.open({
        type: 2,
        content: ''
    });
     
     getSetUnameF(function(data){
         
         if(data){
             
             getServeApiCode(data)
             console.log(data);
         }else{
             PL.open({
                content: '您还为设置帐号',
                time: 2
            });
            
            $("#first_name").focus();
         }
     })
     
     
  });
  
  
  
  $("input[name=numberType]").click(function(){
       
     var typ =  $("input[name=numberType]:checked").val();
     
     var urlJson = {
         panli : ["http://houtai.panli.com/plugins/GetTaobaoOrder.ashx",
         "http://houtai.panli.com/plugins/SaveTaobaoLogisticsInfo.ashx"],
         Wiwaa : ["http://hezuo.panli.com/plugins/GetTaobaoOrder.ashx",
         "http://hezuo.panli.com/plugins/SaveTaobaoLogisticsInfo.ashx"]         
     };
     
     
     
     
       
      if(typ == "1"){
          $("#getDataUrl").val(urlJson.panli[0]);
          $("#postDataUrl").val(urlJson.panli[1]);
          
      }else{
         $("#getDataUrl").val(urlJson.Wiwaa[0]);
          $("#postDataUrl").val(urlJson.Wiwaa[1]); 
      }
       
        
   });
  
//   Wiwaa系统获取和保存地址
//http://hezuo.panli.com/plugins/GetTaobaoOrder.ashx
//http://hezuo.panli.com/plugins/SaveTaobaoLogisticsInfo.ashx


// panli 系统获取和保存地址
// http://houtai.panli.com/plugins/GetTaobaoOrder.ashx
// http://houtai.panli.com/plugins/SaveTaobaoLogisticsInfo.ashx



  
//清除
  $("#clearId").on("click",function(){
     
     PL.open({
        title: '警告',
        content: '您确定要删除所有设置保存的数据吗',
        btn: ['嗯', '不要'],
        yes: function(index){
            clearDB();
            sedReload();
        }
    });
     
     
  });
// 打开页面
  $("#openPageId").on("click",function(){
     orderIdDel()
  });
})


// 注入开始
function contentScript(){
    
    chrome.tabs.query(
      {active: true, currentWindow: true}, 
      function(tabs) {
            chrome.tabs.sendMessage(
              tabs[0].id, 
             {greeting: "startInfo"}, 
             function(response) {                 
                 PL.open({
                    content: response.farewell,
                    time: 2
                });
                   
                  
         });
    });
}

//注入刷新

function sedReload(){
    
    
    chrome.tabs.query(
      {active: true, currentWindow: true}, 
      function(tabs) {
            chrome.tabs.sendMessage(
              tabs[0].id, 
             {greeting: "reload"}, 
             function(response) {                 
                 PL.open({
                    content: '重加载成功',
                    time: 2
                });
                   
                  
         });
    });
    
 
}

// 注入订单号

// function sedOrderId(){
    
//     chrome.tabs.query(
//       {active: true, currentWindow: true}, 
//       function(tabs) {
//             chrome.tabs.sendMessage(
//               tabs[0].id, 
//              {greeting: "reload"}, 
//              function(response) {                 
//                  PL.open({
//                     content: '重加载成功',
//                     time: 2
//                 });
                   
                  
//          });
//     });
    
    
// }


chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type=="taobao-information"){
        
        var obj = {"OrderId": request.Ocode.replace(/(^\s+)|(\s+$)/g,""),
                "PayId":request.Zcode.replace(/(^\s+)|(\s+$)/g,""),
                "CompanyName":request.Ycop,
                "PackageNum":request.Ycode,
                "BuyMessage":request.UMsg
                }
        
    var urlK = openTaoBaoUrl(request.Ocode);
     var str = '<tr>'+ 
                '<td><a target="_blank" href="'+ urlK +'" >'+ request.Ocode +'</a></td>'+
                '<td>'+ request.Zcode +'</td>'+
                '<td>'+ request.uName +'</td>'+
                '<td>'+ request.UMsg +' </td>'+
                '<td>'+ request.Ycode +'</td>'+
                '<td>'+ request.Ycop +'</td>'+
                '</tr>';
              
        $(".order-tbody").append(str);
        
        
        postOrderInfoServer(obj,function(data){ 
                    
        })
  
    }else if(request.type=="error-orderId"){
        
        console.log(request.Ocode);
        
        
        rederEndTime();
        
        // if(request.Ocode.length > 2){
            
            
             var str = '<li><a target="_blank" href="'+ openTaoBaoUrl(request.Ocode) +'">'+ request.Ocode +'</a></li>';

             errorIdListFor(str)
            
        // }else{
            
        //     errorNetwork();
            
            
        // }
        
        
    }
	

});



function errorIdListFor(str) {
    console.log(str)
    
//   var sps =  $(".errorIdList li");
  
  
//   if(sps.length > 0){
      
//       var isNo = true;
      
//       for(var i=0;i< sps.length;i++){
          
//          var id_ =   sps[i].text();
         
//          Console.log(id_)
          
//           if(id_ == str){
//               isNo = false;
//               Console.log("you")
//           }
          
//       };
      
      
      
      
         $(".errorIdList").append(str);
         
         
         var sps =  $(".errorIdList li");
         
         if(sps.length > 0){
             
             $("#errorIdListBox").show();
         }
        
         PD(".errorIdNum").text($(".errorIdList li").length +"个");
      
      
       
      
//   }
  
    
    
}

//网络错误次数
function errorNetwork(){
    
  var num =  Number($(".errorNetwork").text());
  
  
  $(".errorNetwork").text(num+1);
  
  if(num>0){
      $("#errorNetworkBox").show();
  }
   
   
    
   
   
    
}


// function render_search_result(result, isBulk) {
//     var tbody = $('#tbody-hosts'),
//         html = '';
//     isBulk = typeof isBulk === 'undefined' ? tbody.is('.needBulk') : isBulk;
//     if (result.length == 0) {
//         html = '<tr><td colspan="6">No Results</td></tr>';
//     } else {
//         $(result).each(function (i, v) {
//             v.tags = v.tags ? (v.tags.join(', ')) : '';
//             v.status_class = v.status ? 'status-enabled' : 'status-disabled';
//         });
//         html = $('#host-item').extendObj(result);
//         tbody.html( html );
//     }
// }



