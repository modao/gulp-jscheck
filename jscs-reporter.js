/**
 * jscs-reporter模块：将jscs检查的错误打印到项目根目录下的jscs.log文件中
 */


"use strict";

var fs = require('fs');
var LOG_FILE = 'jscs.log';


module.exports = {
    /**
     * 清空LOG_FILE中的内容
     */
    clearLog: function() {
        //清空jscs.log文件
        fs.writeFileSync(LOG_FILE, '');
    },
    /**
     * jscs检查器的reporter调用API
     * @param filename 错误文件名与路径
     * @param results 错误信息
     */
    reporter: function(filename, results){
        var errorStr;
        results.forEach(function(error){
            errorStr = 'Filename:' + filename + ', Line ' + error.line + ', Col ' + error.column + ', Rule ' + error.rule + ', ' + error.message;
            console.log(errorStr + '\n');
            fs.appendFileSync(LOG_FILE, errorStr + '\n');
        });
    },

    /**
     * 只将错误信息输出在console中
     * @param filename 错误文件名与路径
     * @param results 错误信息
     */
    console: function(filename, results) {
        var errorStr;
        results.forEach(function(error){
            errorStr = 'Filename:' + filename + ', Line ' + error.line + ', Col ' + error.column + ', Rule ' + error.rule + ', ' + error.message;
            console.log(errorStr + '\n');
        });
    }

};
