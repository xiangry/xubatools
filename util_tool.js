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


module.exports = ToolUtil;