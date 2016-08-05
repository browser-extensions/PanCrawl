function stripscript(s) {
    return s.replace(/<script.*?>.*?<\/script>/ig, '');
}
// 天猫页面数据
function tmallElement() {



    var YcodeT = "",
        YcopT = "";
    var regStrLeft = PD("#J_trade_imfor").text().replace(/<script.*?>.*?<\/script>/ig, '');
    var regStrRight = PD("#J_trade_detail").text().replace(/<script.*?>.*?<\/script>/ig, '');
    var regStrBottom = PD(".content-package").text().replace(/\s/g, '').replace(/<script.*?>.*?<\/script>/ig, '');

    // var playCode = PD('.trade-dropdown-data').eq(0).text();
    var playCode = regStrLeft.split(/成交时间|支付宝交易号：/)[1];
    //  console.log(PD('.trade-dropdown-data'));


    if (playCode) {
        var yunSp = PD(".trade-detail-logistic span");

        // YcodeT = yunSp.eq(2).text();
        // YcopT =  yunSp.eq(0).text();
        // YcodeT = regStrRight.split(/运单号|包裹1/)[1];
        // YcopT = regStrRight.split(/2016-|运单号:/)[1];

        YcodeT = regStrBottom.split(/2016-|运单号:/)[1];
        YcopT = regStrBottom.split(/运单号|包裹1/)[1];


        if (YcodeT == "—" || YcodeT == undefined || YcodeT == null) {
            YcodeT = "";
        }

        if (YcopT == "—" || YcopT == undefined || YcopT == null) {
            YcopT = "";
        }


    }




    var infoD = PD("#J_trade_imfor");

    // var uname = infoD.find(".table-list").eq(0).find(".address-detail").text().split('，')[0];
    var uname = regStrLeft.Trim().split(/,|，|订单信息收货地址：/)[1];

    var liuyan = regStrLeft.split(/订单编号|买家留言：/)[1];




    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: GetQueryString("biz_order_id"),
        Ycode: YcodeT,
        Zcode: isNaN(playCode) ? undefined : playCode,
        UMsg: liuyan,
        sta: 100,
        Ycop: YcopT
    };


    return msg;
}



// 淘宝页面数据
function taobaoElement() {




    if (PD("#mytaobao-panel").text().trim() == "你无权查看此交易!") {

        var msg = {
            type: "taobao-information",
            Ocode: GetQueryString("bizOrderId") ? GetQueryString("bizOrderId") : GetQueryString("biz_order_id"),
            sta: 110
        };


        return msg;
    }


    if (PD(".addr_and_note").length > 0 || PD(".order-dashboard").length >0) {

        var msg = taobaoStrOldRx();

        return msg;
    } else {


        var msg = taobaoStrReact();
        console.log(msg)
        return msg;
    }









}

// reactjs 渲染模式
function taobaoStrReact() {

    var OcodeT = YcodeT = ZcodeT = UMsgT = YcopT = uname = "";

    var taobaoStr = PD("#detail-panel").text().replace(/<script.*?>.*?<\/script>/ig, '').replace(/\n/g, '');

    taobaoStr.split(/订单信息收货地址：|运送方式/) ? uname = taobaoStr.split(/订单信息收货地址：|运送方式/)[1].split('，')[0] : "";
    taobaoStr.split(/订单编号:|支付宝交易号/) ? OcodeT = taobaoStr.split(/订单编号:|支付宝交易号/)[1] : "";
    taobaoStr.split(/运单号码：|有疑问可咨询/) ? YcodeT = taobaoStr.split(/运单号码：|有疑问可咨询/)[1] : "";
    taobaoStr.split(/物流公司：|运单号/) ? YcopT = taobaoStr.split(/物流公司：|运单号/)[1] : "";
    taobaoStr.split(/支付宝交易号:|创建时间/) ? ZcodeT = taobaoStr.split(/支付宝交易号:|创建时间/)[1] : "";

    YcodeT == "—" ? YcodeT = "" : "";
    YcopT == "—" ? YcopT = "" : "";


    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: OcodeT,
        Ycode: YcodeT,
        Zcode: ZcodeT,
        UMsg: UMsgT,
        sta: 100,
        Ycop: YcopT
    };

    console.log(msg);

    return msg;

}


function taobaoStrOldRx() {
     var OcodeT = YcodeT = ZcodeT = UMsgT = YcopT = uname = "";

     
    var Pt = PD("#J_TabView").text().replace(/\n/g, '');

    ZcodeT = Pt.split(/支付宝交易号|发货时间|创建时间/)[1].replace(/：|:+/g, "").trim();
    OcodeT = Pt.split(/订单编号|支付宝交易号/)[1].replace(/：|:+/g, "").trim();
    UMsgT =  Pt.split('消费者热线')[1] ? Pt.split('买家留言')[1].split('消费者热线')[0].replace(/：|:+/g, "").trim() : Pt.split('买家留言')[1].split('卖家信息')[0].replace(/：|:+/g, "").trim();
    uname =  Pt.split(/收货地址|买家留言/)[1].split('，')[0].replace(/：|:+/g, "").trim();

    var expT = PD(".logistics-list").text().replace(/\n/g, '');

    YcopT = expT.split(/物流公司|运单号/)[1].replace(/：|:+/g, "").trim();
    YcodeT = expT.split(/运单号/)[1].split(/\s/)[1].replace(/：|:+/g, "").trim();

    YcodeT == "—" ? YcodeT = "" : "";
    YcopT == "—" ? YcopT = "" : "";

    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: OcodeT,
        Ycode: YcodeT,
        Zcode: ZcodeT,
        UMsg: UMsgT,
        sta: 100,
        Ycop: YcopT
    };

    return msg;


}

// 传统 渲染模式
function taobaoStrOld() {

    var OcodeT = YcodeT = ZcodeT = UMsgT = YcopT = uname = "";

    if (PD("#detail-panel .alilay-num").length < 1) {
        uname = PD.trim(PD('.addr_and_note').find('dd').text()).split('，')[0];

        var OcodeLen = PD('.misc-info').text().length;
        if (OcodeLen > 0) {

            if (PD('.logistics-id').length > 0) {
                YcodeT = PD.trim(PD('.logistics-id').text());


                if (YcodeT == "—" || YcodeT == undefined || YcodeT == null) {
                    YcodeT = "";
                }


            }
            if (PD('.logistics-company').length > 0) {
                YcopT = PD.trim(PD('.logistics-company').text());
                if (YcopT == "—" || YcopT == undefined || YcopT == null) {
                    YcopT = "";
                }


            }

            OcodeT = PD.trim(PD('.misc-info').text()).replace(/\n/g, '||').split('||')[4];
            ZcodeT = PD.trim(PD('.misc-info').text()).replace(/\n/g, '||').split('||')[8];
            UMsgT = PD('#J_ExistMessage').text();

        }
    } else {


        ZcodeT = PD("#detail-panel .alilay-num").text().trim();
        OcodeT = PD("#detail-panel .order-num").text().trim();

        var ttinfo = _.compact(PD.trim(PD("#detail-panel .simple-list").text()).replace(/\n/g, '||').split('||'));


        uname = ttinfo[2].split('，')[0].trim();

        YcodeT = ttinfo[8] ? ttinfo[8].split("查")[0].trim() : "";

        YcopT = ttinfo[6] ? ttinfo[6].trim() : "";

        UMsgT = ttinfo[10] ? ttinfo[10].trim() : "";


    }

    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: OcodeT,
        Ycode: YcodeT,
        Zcode: ZcodeT,
        UMsg: UMsgT,
        sta: 100,
        Ycop: YcopT
    };

    return msg;
}


// 955大药房
function yaoElement() {



    var YcodeT = "",
        YcopT = "";


    var playCode = PD('.trade-dropdown-data').eq(0).text();
    console.log(PD('.trade-dropdown-data'));
    if (playCode) {
        var yunSp = PD(".trade-detail-logistic span");

        YcodeT = yunSp.eq(2).text();
        YcopT = yunSp.eq(0).text();

        if (YcodeT == "—" || YcodeT == undefined || YcodeT == null) {
            YcodeT = "";
        }

        if (YcopT == "—" || YcopT == undefined || YcopT == null) {
            YcopT = "";
        }


    }



    if (isNaN(playCode)) {
        playCode == '0';
    }

    console.log(playCode);

    var infoD = PD("#J_trade_imfor");

    var uname = infoD.find(".table-list").eq(0).find(".ui-trade-label").text().split(',')[0];

    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: GetQueryString("biz_order_id"),
        Ycode: YcodeT,
        Zcode: playCode,
        UMsg: infoD.find(".table-list").eq(1).find(".ui-trade-label").text(),
        Ycop: YcopT
    };


    return msg;



}

// 1688

function alibabaElement() {



    var uname = PD.trim(PD('.address-detail').text()).split('，')[0];

    var YcodeT = "",
        YcopT = "";

    if (PD(".trade-detail-logistic").attr('data-mail-no')) {
        YcodeT = PD(".trade-detail-logistic").attr('data-mail-no');
        YcopT = PD(".trade-detail-logistic").attr('data-company-name');

        if (YcodeT == "—" || YcodeT == undefined || YcodeT == null) {
            YcodeT = "";
        }

        if (YcopT == "—" || YcopT == undefined || YcopT == null) {
            YcopT = "";
        }


    }



    var msg = {
        type: "taobao-information",
        uName: uname,
        Ocode: GetQueryString("biz_order_id"),
        Ycode: YcodeT,
        Zcode: PD('.small-drop-down tr').text().replace(/\n/g, '||').replace(/\s/g, "").split('||')[2],
        UMsg: PD('.message-detail').text(),
        Ycop: YcopT
    };


    return msg;



}