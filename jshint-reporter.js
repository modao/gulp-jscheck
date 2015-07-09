/**
 * jshint reporter：将jshint的信息输出到根目录下的jshint.log文件中
 */


"use strict";

var fs = require('fs');
var LOG_FILE = 'jshint.log';


module.exports = {
    /**
     * 清空jshint.log文件
     */
    clearLog: function() {
        fs.writeFileSync(LOG_FILE, '');
    },
    /**
     * jshint检查器的reporter
     * @param filename 错误文件名与路径
     * @param results 错误信息
     */
    reporter: function(filename, results){
        var errorStr;
        results.forEach(function(error){
            errorStr = 'Filename:' + filename + ', line ' + error.line + ', col ' + error.character + ', code ' + error.code + ', ' + error.reason;
            console.log(errorStr + '\n');
            fs.appendFileSync(LOG_FILE, errorStr + '\n');
        });
    },

    /**
     * 只将错误结果输出在console中
     * @param filename 错误文件名与路径
     * @param results 错误信息
     */
    console: function(filename, results) {
        var errorStr;
        results.forEach(function(error){
            errorStr = 'Filename:' + filename + ', line ' + error.line + ', col ' + error.character + ', code ' + error.code + ', ' + error.reason;
            console.log(errorStr + '\n');
        });
    }

};
