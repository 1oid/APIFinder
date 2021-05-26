console.log("hallo")
chrome.devtools.panels.create(
    "API数据列表", "../../images/icon32.png", "/page/devtools/index.html",
    function(panel) {
});


const bgPage = chrome.extension.getBackgroundPage()

let text = ""
let data = bgPage.saveList.data

chrome.tabs.query({
    active: true
}, tabs => {
    let tab = tabs[0]
    let request = data[URL.getURLHost(tab.url)]

    if(request === undefined)
        return ;

    for(let key in request) {
        let requestItem = request[key]

        text += "<tr>"
        text += "<td style=\"max-width: 40%;word-break: break-word\">" + requestItem.url + "</td>"

        if(requestItem.method.toLocaleUpperCase() === "GET") {
            text += "<td><span class='label label-success'>" + requestItem.method + "</span></td>"
        }else if(requestItem.method.toLocaleUpperCase() === "POST") {
            text += "<td><span class='label label-danger'>" + requestItem.method + "</span></td>"
        }
        text += "<td>" + JSON.stringify(requestItem.getParamter()) + "</td>"

        text += "</tr>"
    }

    $("#app tbody").html(text)

})

// for(let site in data) {
//     let item = data[site]
//
//     text += "<tr>"
//     text += "<td>" + site + "</td>"
//     text += "<td>" + site + "</td>"
//     text += "</tr>"
// }
//
// $("#app tbody").html(text)


