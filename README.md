## js代码检查gulp插件

js代码风格检查使用的统一jshint与jscs规范

### 使用方法：
```
    var jscheck = require('gulp-jscheck');
    gulp.src('xxx.js').pipe(jscheck({
        reporter: true，
        abort: true
    }));
```

### 配置参数：
* reporter[boolean]: 是否使用reporter，默认为false。
如果开启，则会在项目根目录下创建jshint.log与jscs.log来记录代码检查的错误日志，方便进行改正
* abort[boolean]: 是否当检查到jshint或jscs错误时就抛出异常并终止构建，默认为false。
如果开启，则当打包过程中出现jshint或jscs错误时就会给出提示并强制终止构建，目的在强制要求修正这些问题
### 模块中内置的jshint与jscs配置项

* jshint
```
{
    "indent"        : 4,
    "quotmark"      : "single",
    "bitwise"       : true,
    "camelcase"     : true,
    "curly"         : true,
    "eqeqeq"        : true,
    "es3"           : true,
    "forin"         : true,
    "freeze"        : true,
    "immed"         : true,
    "latedef"       : true,
    "newcap"        : true,
    "noarg"         : true,
    "noempty"       : true,
    "nonbsp"        : true,
    "nonew"         : true,
    "plusplus"      : true,
    "undef"         : true,
    "unused"        : true,
    "strict"        : true,
    "trailing"      : true,
    "asi"           : false,
    "boss"          : false,
    "debug"         : false,
    "eqnull"        : false,
    "esnext"        : true,
    "evil"          : false,
    "expr"          : false,
    "funcscope"     : false,
    "globalstrict"  : false,
    "iterator"      : false,
    "lastsemic"     : false,
    "laxbreak"      : false,
    "laxcomma"      : false,
    "loopfunc"      : false,
    "moz"           : false,
    "multistr"      : false,
    "notypeof"      : false,
    "proto"         : false,
    "scripturl"     : false,
    "smarttabs"     : false,
    "shadow"        : false,
    "sub"           : false,
    "supernew"      : false,
    "validthis"     : false,
    "noyield"       : false,
    "browser"       : true,
    "jquery"        : true,
    "node"          : true,
    "phantom"       : true,
    "nomen"         : false,
    "onevar"        : false,
    "passfail"      : false,
    "white"         : false,
    "maxparams"     : 5,
    "maxdepth"      : 6,
    "maxstatements" : 30,
    "maxcomplexity" : 20,
    "maxlen"        : 100,
    "predef": [
        "console"    ,
        "KISSY"      ,
        "JSTracker"  ,
        "define"     ,
        "require"    ,
        "module"     ,
        "exports"    ,
        "describe"   ,
        "xdescribe"  ,
        "it"         ,
        "xit"        ,
        "before"     ,
        "after"      ,
        "beforeEach" ,
        "afterEach"  ,
        "alert"      ,
        "prompt"     ,
        "QN"         ,
        "JSON"
    ]
}
```

* jscs:
```
{
    "preset": "google",
    "validateIndentation": 4,
    "disallowMultipleVarDecl": null,
    "disallowMultipleLineBreaks": null,
    "maximumLineLength": 100,
    "verbose": true
}
```
