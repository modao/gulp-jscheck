/**
 * jscs-reporter模块：将jscs检查的错误打印到项目根目录下的jscs-debug.log文件中
 */


"use strict";

var fs = require('fs');
var chalk = require('chalk');
var LOG_FILE = 'jscs-debug.log';


module.exports = {
    /**
     * 删除log文件
     */
    removeLog: function() {
        //删除jscs-debug.log文件
        if(fs.existsSync(LOG_FILE)) {
            fs.unlinkSync(LOG_FILE);
        }
    },
    /**
     * 清空LOG_FILE中的内容
     */
    clearLog: function() {
        //清空jscs-debug.log文件
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
            errorStr = ' Filename:' + filename + ', Line ' + error.line + ', Col ' + error.column + ', Rule ' + error.rule + ', ' + error.message;
            console.log(chalk.red('[JSCS ERROR]') + errorStr + '\n\n');
            fs.appendFileSync(LOG_FILE, errorStr + '\n\n');
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
            errorStr = ' Filename:' + filename + ', Line ' + error.line + ', Col ' + error.column + ', Rule ' + error.rule + ', ' + error.message;
            console.log(chalk.red('[JSCS ERROR]') + errorStr + '\n\n');
        });
    }

};
