//页面渲染

function readerList(data){
//    console.log(data);
   
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