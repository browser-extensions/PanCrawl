// 
function getStorage(name) {
    return localStorage.getItem(name);
}

//去空格
function delHtmlTag(str) {
    var str = str.replace(/<\/?[^>]*>/gim, ""); //去掉所有的html标记
    var result = str.replace(/(^\s+)|(\s+$)/g, ""); //去掉前后空格
    return result.replace(/\s/g, ""); //去除文章中间空格
}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

//停止
function stopCrap() {

    chrome.storage.sync.remove('sl', function() {
        PL.open({
            content: '暂停成功',
            time: 2
        });
    });
}


// 清除数据

function storageDel(info, call) {
    chrome.storage.sync.remove(info, function(data) {
        if (call) {
            call(data);
        }

    });
}


//list
function DBinfoList(_tb, callback) {

    chrome.storage.sync.get(_tb, function(d) {

        callback(d[_tb]);

    })

}

//clearDB();

// 清除数据
function clearDB() {
    chrome.storage.sync.clear(function(data) {
        console.log(data);

        PD(".order-tbody").html('');
        PL.open({
            content: '清除成功',
            time: 2
        });


    })
}


// url错误提示
function getSetUrlError() {

    PL.open({
        content: '地址错误',
        title: ""
    });

}


function isOrderNull() {
    var _host = window.location.hostname;

    var mmsg;



    if (_host == "buyertrade.taobao.com") {
        mmsg = taobaoElement();

    } else if (_host == "err.tmall.com") {

        PL.open({
            content: '准备尝试重新抓取',
            time: 10
        });


        return false;
    } else if (_host == "tmtrade.yao.95095.com") {
        mmsg = tmallElement();
    } else {
        mmsg = tmallElement();
    }


    if (mmsg.sta == 110) {

        orderIdDel(function(data) {
            PL.open({
                content: '次订单不是本账号,请到后台复查该订单所属账号',
                time: 2
            });
        })



        errorIDMessg(mmsg.Ocode)

        return false;


    }


    if (mmsg.Ocode == 0 || mmsg.Ocode == "0" || mmsg.Ocode == null || mmsg.Ocode == undefined) {

        PL.open({
            content: '正在尝试重新抓取',
            time: 2
        });


        return false;
    }


    if (mmsg.Zcode == 0 || mmsg.Zcode == "0" || mmsg.Zcode == null || mmsg.Zcode == undefined) {

        orderIdDel(function(data) {
            PL.open({
                content: '抓取失败,请@Julian修复',
                time: 2
            });
        })

        errorIDMessg(mmsg.Ocode)

        return false;

    }


    return mmsg;

}



function errorIDMessg(id) {

    var errormsg = {
        type: "error-orderId",
        Ocode: id,
    };

    chrome.runtime.sendMessage(errormsg)

}












//去除空格 
String.prototype.Trim = function() {
        return this.replace(/\s+/g, "");
    }
    //去除换行 
function clearBr(key) {
    key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    return key;
}

//去除左侧空格 
function LTrim(str) {
    return str.replace(/^\s*/g, "");
}
//去右空格 
function RTrim(str) {
    return str.replace(/\s*$/g, "");
}
//去掉字符串两端的空格 
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
//去除字符串中间空格 
function CTim(str) {
    return str.replace(/\s/g, '');
}
//是否为由数字组成的字符串 
function is_digitals(str) {
    var reg = /^[0-9]*$/; //匹配整数 

    return reg.test(str);
}


// 获取最新版本

function get_new_version() {

    PD.get("http://browser-extensions.github.io/PanCrawl/package.json", function(data) {

        if (data.version > get_version()) {

            PL.open({
                title: '有新版',
                content: '有新版了！是否去 下载',
                btn: ['去下载', '不下载'],
                yes: function(index) {

                    PL.close(index);

                    window.open("https://github.com/browser-extensions/PanCrawl/releases");

                }
            });



        }

    })
}

// 获取当前版本号

function get_version() {

    return PD("#version").attr("data-v");

}