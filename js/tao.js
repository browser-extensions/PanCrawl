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