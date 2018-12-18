const ToolUtil = require("./util_tool");
var XLSX = require("xlsx")
const fs = require("fs");

const export_path = "out"

function convertSheet2Json(ws, name) {
    var ref = ws["!ref"]
    var cols = ref.replace(/[0-9]/g, "").split(":");
    var rows = ref.replace(/[a-zA-Z]/g, "").split(":");

    var keyids = ToolUtil.getValidKeyIds(ws, cols);
    var jsondata = {}
    for (let i = 4; i <= rows[1]; i++) {
        var data = {};
        keyids.forEach(function (keyid) {
            var value = ws[keyid.name + i];
            data[keyid.key] = value.v;
            if (keyid.type === "id"){
                jsondata[value.v.toString()] = data;
            }
        })
    }

    const str_data = JSON.stringify(jsondata);
    ToolUtil.deleteFolder(export_path);
    fs.mkdir(export_path, function (err) {
        if (!err || err.code === "EEXIST"){
            fs.writeFile(export_path + "/" + name + ".json", str_data, function (err) {
                if (err){
                    console.log("写文件错误");
                } else {
                    console.log("success");
                }
            });
        }
    });
}


function convertExcel2Json(file) {
    var buf = fs.readFileSync(file);
    var wb = XLSX.read(buf, {type: 'buffer'});
    var ws = wb.Sheets["player_level"]

    wb.SheetNames.forEach(function (name) {
        convertSheet2Json(wb.Sheets[name], name);
    })
}

convertExcel2Json("./config/level_exp.xlsx");


// console.log("jsondata ===== ", JSON.stringify(jsondata))




