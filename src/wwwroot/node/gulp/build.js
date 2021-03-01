var path = require("path");
var paths = {
    jspages: [
        getSrc("./test/test.ts"),
        getSrc("./index/index.ts"),
    ]
};
//获取文件的绝对地址
function getSrc(src) {
    return path.resolve(__dirname, '../../work/page', src);
}

function isArrayFn(value) {
    if (typeof Array.isArray === "function") {
        return Array.isArray(value);
    } else {
        return Object.prototype.toString.call(value) === "[object Array]";
    }
}

paths.jspages.push(getSrc("../public/script/index.ts"));

exports.paths = paths;
exports.getSrc = getSrc;
exports.isArrayFn = isArrayFn;