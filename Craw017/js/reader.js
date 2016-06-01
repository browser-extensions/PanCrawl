//页面渲染

function readerList(data){
//    console.log(data);
   
   var str = '';
   
   for(var i=0;i<data.length;i++){
       
         var urlK = openTaoBaoUrl(data[i].Ocode);
         str = str + '<tr>'+
                    '<td><a  target="_blank" href="'+ urlK +'">'+ data[i].Ocode +'</a></td>'+
                    '<td>'+ data[i].Zcode +'</td>'+
                    '<td>'+ data[i].uName +'</td>'+
                    '<td>'+ data[i].UMsg +' </td>'+
                    '<td>'+ data[i].Ycode +'</td>'+
                    '<td>'+ data[i].Ycop +'</td>'+
               '</tr>';
       
       
   }
   
   PD('.order-tbody').html(str);
   
   
     
}

// 渲染已经抓取个数
function readerCrawlNum(num){
    
  
    rederEndTime();
    PD(".totalOrderOK").text("已成功抓取 "+ num +"个订单");

}

// 渲染总抓取个数
function readerTotaNum(num){
    
    PD(".totalOrder").text("总共  "+ num +"个订单");

}
//渲染最后通信时间

function rederEndTime(){
    
    var today = new Date();
    var h=today.getHours()
    var m=today.getMinutes()
    var s=today.getSeconds()
    
    PD(".endTime").text(CurentTime());
    
    
}

function CurentTime(){ 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds()
       
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
        
        if(ss < 10) clock += '0';
        clock += ss;
        
        return(clock); 
} 