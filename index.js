/**
 * gulp-jscheck模块
 */

'use strict';

var through2 = require("through2");
var jshint = require('jshint');
var JscsChecker = require('jscs');
var checkConfig = require('./checkrule.json');
var jshintReporter = require('./jshint-reporter');
var jscsReporter = require('./jscs-reporter');

var jshintConfig = checkConfig.jshint;
var jscsConfig = checkConfig.jscs;
var jshintErrorsCount = 0,
    jscsErrorsCount = 0;

/**
 * 可以通过配置config.reporter为true来开启jshint的reporter，功能为将检查日志输出到项目根目录下的jshint.log文件中，方便查看
 * @param config
 * @returns {*}
 */
module.exports = function(config) {

    //默认关闭jshint的reporter
    var openReporter = config.reporter || false;
    var jscsChecker = new JscsChecker();
    jscsChecker.registerDefaultRules();
    //载入jscs的配置
    jscsChecker.configure(jscsConfig);

    var content, filename;
    var jshintErrors, jscsErrors;

    //如果设置了开启reporter，则要在写入log前先清空对应的log文件内容
    if(openReporter) {
        jshintReporter.clearLog();
        jscsReporter.clearLog();
    }

    return through2.obj(function(file, encode, callback) {

        //如果文件为空，则直接返回
        if(file.isNull()) {
            return callback();
        }

        content = file.contents.toString();
        filename = file.history[0];

        //开启jshint检查
        jshint.JSHINT(content, jshintConfig);

        jshintErrors = jshint.JSHINT.errors;
        jshintErrorsCount += jshintErrors.length;
        if(openReporter) {
            jshintReporter.reporter(filename, jshintErrors);
            if(jshintErrorsCount <= 0) {
                jshintReporter.removeLog();
            }
        }else {
            jshintReporter.console(filename, jshintErrors);
        }

        //开启jscs检查

        jscsErrors = (jscsChecker.checkString(content, file.relative)).getErrorList();
        jscsErrorsCount += jscsErrors.length;
        if(openReporter) {
            jscsReporter.reporter(filename, jscsErrors);
            if(jscsErrorsCount <= 0) {
                jscsReporter.removeLog();
            }
        }else {
            jscsReporter.console(filename, jscsErrors);
        }

        //一定要调用callback告知该文件模块已经处理完毕
        callback(null, file);

    });
};
