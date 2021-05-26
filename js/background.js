


// 获取请求正文
chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
        // let obj = new detailRequest(details)
        // obj.setRequestBody(details.requestBody)
        // console.log()
        let request
        let hash = URL.hashForURL(details.url, details.method)

        if(saveList.data[details.initiator] === undefined || saveList.data[details.initiator][hash] === undefined)
            request = new detailRequest(details)
        else
            request = saveList.data[details.initiator][hash]

        request.setRequestBody(details.requestBody)
        saveList.update(details.initiator, hash, request)
    },
    {"urls": ["<all_urls>"]},
    ["blocking", "requestBody", "extraHeaders"]
)


// 获取请求头
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        // let obj = new detailRequest(details)
        // obj.setHeaders(details.requestHeaders)
        // console.log(obj)

        let request
        let hash = URL.hashForURL(details.url, details.method)

        if(saveList.data[details.initiator] === undefined || saveList.data[details.initiator][hash] === undefined)
            request = new detailRequest(details)
        else
            request = saveList.data[details.initiator][hash]

        request.setHeaders(details.requestHeaders)
        saveList.update(details.initiator, hash, request)
    },
    {"urls": ["<all_urls>"]},
    ["blocking", "requestHeaders", "extraHeaders"]
)