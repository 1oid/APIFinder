/**
 * 放一些配置文件
 * */

/**
 * {
 *     initiator: {
 *         requestHash: [Object, Object, Object, ....],
 *         requestHash-1: [Object, Object, Object, ....],
 *
 *         第二种，待定
 *         requestHash: [Object, Object, Object, ....],
 *         requestHash-1: [Object, Object, Object, ....],
 *         ........
 *     }
 * }
 *
 * */
const STATIC_EXT = {
    data: [
        "js", "css", "map",
        "png", "jpg", "jpeg",
    ],
    has(ext) {
        return this.data.indexOf(ext.toLocaleLowerCase()) !== -1;
    }
}

const blackExtFilterList = [
    "css"
];

var saveList = {
    data: {},
    update(initiator, hash, v) {
        if(initiator === undefined)
            return ;

        // 过滤后缀
        if(blackExtFilterList.indexOf(URL.getURLExt(v.url)) !== -1)
            return ;

        if(saveList.data[initiator] === undefined)
            saveList.data[initiator] = {}

        saveList.data[initiator][hash] = v
        // saveList[initiator][hash] = []
        // saveList[initiator][hash].push(v)
    }
}
