/**
 * gulp-jscheck模块
 */

'use strict';

var through2 = require("through2");
var chalk = require('chalk');
var gutil = require('gulp-util');
var jshint = require('jshint');
var JscsChecker = require('jscs');
var checkConfig = require('./checkrule.json');
var jshintReporter = require('./jshint-reporter');
var jscsReporter = require('./jscs-reporter');

var jshintConfig = checkConfig.jshint;
var jscsConfig = checkConfig.jscs;
var jshintErrorsCount = 0,
    jscsErrorsCount = 0;
var PLUGIN_NAME = 'gulp-jscheck';

/**
 * 可以通过配置config.reporter为true来开启jshint的reporter，功能为将检查日志输出到项目根目录下的jshint.log文件中，方便查看
 * @param config
 * @returns {*}
 */
module.exports = function(config) {

    //默认关闭jshint的reporter
    var openReporter = config.reporter || false;
    //默认关闭存在jshint与jscs的报错时，就要终止打包并抛出gulp plugin error行为
    var abort = config.abort || false;
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

        //如果配置了检查到错误就要修复错误才能打包，则要抛出pluginError
        if (abort && (jshintErrorsCount > 0 || jscsErrorsCount > 0)) {
            this.emit('error', new gutil.PluginError(PLUGIN_NAME, '代码因存在JSHINT或JSCS校验错误而打包终止，请修复这些错误之后重新打包[您也可以在插件配置中设置abort为false关闭校验]'));
        }

        //一定要调用callback告知该文件模块已经处理完毕
        callback(null, file);

    });
};
