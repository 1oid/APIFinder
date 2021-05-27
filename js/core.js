/**
 * 一些核心函数
 * */

class detailRequest {
    /**
     * 请求对象
     * */

    constructor(detail) {

        this.initiator = detail.initiator
        this.method = detail.method
        this.requestId = detail.requestId
        this.tabId = detail.tabId
        this.url = detail.url
        this.requestBody = ""
        this.requestBodyJson = {}
        this.requestHeaders = {}
    }

    setRequestBody(v) {
        let bodyText = ""
        let bodyJson = {}

        if(v === undefined) {
            return bodyText
        }

        let bodys = v.formData

        for(let key in bodys) {
            let body = bodys[key]

            bodyJson[key] = body

            for(let i = 0;i < body.length;i++) {
                bodyText += key + "=" + body[i] + "&"

            }
        }

        if(bodyText !== "")
            bodyText = bodyText.substr(0, bodyText.length - 1)

        this.requestBody = bodyText
        this.requestBodyJson = bodyJson
    }

    setHeaders(v) {
        let headers = {}

        for(let i = 0;i < v.length;i++) {
            let header = v[i]
            headers[header.name] = header.value
        }

        this.requestHeaders = headers
    }

    getParamter() {
        if(this.method.toLocaleUpperCase() === "GET")
            return URL.paramToObject(this.url).param
        else if(this.method.toLocaleUpperCase() === "POST")
            return this.requestBodyJson
    }

    getParamterString() {
        let data = JSON.stringify(this.getParamter())
        return data === "{}" ? "无参数": data
    }

    getMethodLabel() {
        let label = ""

        switch (this.method.toLocaleUpperCase()) {
            case "GET":
                label = "label-success"
                break
            case "POST":
                label = "label-danger"
                break
        }
        return "<span class='label "+label+"'>" + this.method.toLocaleUpperCase() + "</span>"
    }

    getURLExtLabel() {
        let label = ""
        let ext = URL.getURLExt(this.url)

        if(STATIC_EXT.has(ext)) {
            label = ""
            ext = "静态资源"
        }else {
            label = "label-info"
        }
        return "<span class='label "+label+"'>" + ext.toLocaleLowerCase() + "</span>"
    }
}

class URL {

    static paramToObject(url) {
        /**
         * 将url进行参数分离
         * @type {string} URL
         * return {
         *     path: http://baidu.com/index.php
         *     param: {
         *         id: 1,
         *         uname: admin
         *     }
         * }
         */
        let path = url.indexOf("?") === -1 ? url: url.substring(0, url.indexOf("?"))
        let params = url.substring(url.indexOf("?")+1, url.indexOf("#"))
        let paramsList = params.split("&")
        let obj = {
            path: path,
            param: {}
        }

        paramsList.forEach(item => {
            let itemSplit = item.split("=")
            obj.param[itemSplit[0]] = itemSplit[1]
        })

        return obj
    }

    static hashForURL(url, method) {
        /**
         * 将 url + 参数进行 hash，达到去重的目的
         * return md5
         */
        let param = {}
        let paramsText = ""
        let path = ""

        if(method.toLocaleUpperCase() === "GET"){
            let _ = URL.paramToObject(url)
            path = _.path
            param = _.param
        }
        else if(method.toLocaleUpperCase() === "POST"){
            path = URL.paramToObject(url).path
            param = ["POST"]
        }

        for(let key in param) {
            paramsText += key + "=&"
        }
        return hex_md5(path + "?" + paramsText)
    }

    static getURLExt(url) {
        /***
         * 获取 url 文件后缀
         */
        if(url.indexOf("?") === -1)
            return url.substring(url.lastIndexOf(".")+1)
        return url.substring(url.substring(0, url.indexOf("?")).lastIndexOf(".")+1, url.substring(0, url.indexOf("?")).length)
    }

    static getURLHost(url) {
        console.log(url)
        let removeSchema = url.split("://")[1]
        let schema = url.split("://")[0]

        if(removeSchema.indexOf("/") !== -1)
            return schema + "://" + removeSchema.substring(0, removeSchema.indexOf("/"))
        return schema + "://" + removeSchema
    }
}
