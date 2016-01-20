// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "您好"}, function(response) {
//     console.log(response.farewell);
//   });
// });


// chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
//     console.log(response.farewell);
//   });
// });

// chrome.runtime.onConnect.addListener(function(port) {
//     console.assert(port.name == "yisheng");
//     port.onMessage.addListener(function(msg) {
//       if (msg.joke == "Knock knock")
//         port.postMessage({question: "Who‘s there?"});
//       else if (msg.answer == "Madame")
//         port.postMessage({question: "Madame who?"});
//       else if (msg.answer == "Madame... Bovary")
//         port.postMessage({question: "I don‘t get it."});
//    });
//  });

// window.onload = function(){
//    chrome.tabs.query(
//       {active: true, currentWindow: true}, 
//       function(tabs) {
//             chrome.tabs.sendMessage(
//               tabs[0].id, 
//              {greeting: "startInfo"}, 
//              function(response) {
//                  alert(response.farewell)
                  
//          });
//     }); 
// }




// chrome.tabs.query(
//      {active: true, currentWindow: true}, 
//      function(tabs) {
//            var port = chrome.tabs.connect(
//              tabs[0].id, 
//              {name: "yisheng"}
//          );
//  });







// chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
// 	if(request.type!=="cnblog-article-information")
// 		return;
// 	articleData = request;
// 	articleData.firstAccess = "获取中...";
// 	alert(articleData.title);
// });