const fs = require("fs");

var ToolUtil = {}

ToolUtil.value2key = function(value){
    let key = ""
    let v = 0;
    while (value > 0){
        v = value % 26;
        if (v === 0){
            v = 26;
        }
        key = String.fromCharCode(64 + v) + key
        value = (value - v) / 26;
    }
    return key;
}

ToolUtil.getValidKeys = function(ws, cols){
    var valid_keys = [];
    var index = 1;
    while (true){
        var name = ToolUtil.value2key(index);
        if (ws[name + "1"]){
            valid_keys.push(name);
        }
        if (name === cols[1]){
            break
        }
        index += 1;
    };
    return valid_keys;
}

ToolUtil.getValidKeyIds = function(ws, cols){
    var valid_keys = [];
    var index = 1;
    while (true){
        var name = ToolUtil.value2key(index);
        var value = ws[name + "1"];
        if (value){
            var key = ws[name + "3"];
            valid_keys.push({name:name, key: key.v, type: value.v})
        }
        if (name === cols[1]){
            break
        }
        index += 1;
    };
    return valid_keys;
}

ToolUtil.emptyDir = function(path){
    var files = fs.readdirSync(path);
    files.forEach(function (file) {
        var stats = fs.statSync(path + "/" + file);
        if (stats.isDirectory()){
            ToolUtil.emptyDir(path + "/" + file)
        } else {
            fs.unlinkSync(path + "/" + file)
        }
    })
}

ToolUtil.deleteFolder = function(path, func){
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                ToolUtil.deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

module.exports = ToolUtil;
