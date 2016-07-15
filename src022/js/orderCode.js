(function (window) {
    
     var order = {};
     
     
    var codes=[];
  
    order.setStatus(true, 'DIRECT');
     
     
     //开启
    order.setStatus = function (checked, default_mode) {
        saveData('status',checked);
     }
    
    
    function saveData(name, value) {
        localStorage[name] = JSON.stringify(value);
    }
    
    function loadData(name) {
        var s = localStorage[name];
        if (s) {
            try {
                return JSON.parse(s);
            } catch (e) {

            }
        }
        return false;
    }
    
     window.Order = order;
    
    if( localStorage['status'] === undefined ){
        order.setStatus(true, 'DIRECT');
    }
    
    
})(window);