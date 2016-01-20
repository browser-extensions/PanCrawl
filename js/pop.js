
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
//清除
  $("#clearId").on("click",function(){
     
     
     PL.open({
        title: '警告',
        content: '您确定要删除所有数据吗',
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

chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
	if(request.type!=="taobao-information")
	return;
    
     var str = '<tr>'+
                '<td>'+ request.Ocode +'</td>'+
                '<td>'+ request.Zcode +'</td>'+
                '<td>'+ request.uName +'</td>'+
                '<td>'+ request.Ycode +'</td>'+
                '<td>'+ request.Ycop +'</td>'+
                '</tr>';
              
    $(".order-tbody").append(str);
    

});





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



