console.log("hallo")
chrome.devtools.panels.create(
    "API数据列表", "../../images/icon32.png", "/page/devtools/index.html",
    function(panel) {
});

const bgPage = chrome.extension.getBackgroundPage()
const data = bgPage.saveList.data

var getData = url => {
    let text = ""
    let request = data[URL.getURLHost(url)]

    if(request === undefined)
        return ;

    for(let key in request) {
        let requestItem = request[key]

        text += "<tr>"
        text += "<td style=\"max-width: 40%;word-break: break-word\">" + requestItem.url + "</td>"
        text += "<td>" + requestItem.getURLExtLabel() + "</td>"

        text += "<td>" + requestItem.getMethodLabel() + "</td>"
        text += "<td>" + requestItem.getParamterString() + "</td>"

        text += "</tr>"
    }

    return text
}

chrome.tabs.query({
    active: true
}, tabs => {
    let tab = tabs[0]
    $("#app tbody").html(getData(tab.url))
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


