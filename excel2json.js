var XLSX = require("xlsx")
var fs = require("fs")

// XLSX.

var buf = fs.readFileSync("./test/level_exp.xlsx");


var wb = XLSX.read(buf, {type: 'buffer'});

var ws = wb.Sheets["player_level"]


var ref = ws["!ref"]
var cols = ref.replace(/[0-9]/g, "").split(":");
var rows = ref.replace(/[a-zA-Z]/g, "").split(":");

console.log(cols)
console.log(rows)

// https://blog.csdn.net/tingyuanss/article/details/53097904

//
// var info = ref.split(":")
//
//
// var reg = /[a-zA-Z]/g;
// ref = ref.replace(reg,"");
// console.log(ref)
// var xref = ref.split(':')
// console.log(xref)
//
//
// // var line = parseInt(ref.split(':')[1]); // 获取excel的有效行数
//
//
// console.log("ref === ", ref)
// var header = {header: ["A", "B"]}
// console.log("header === ", header.forEach)
// console.log("B1 === ", ws["B1"])
// console.log("B4 === ", ws["B4"])
//
//
// var jdata = XLSX.utils.sheet_to_json(ws,  {
//     header: ["A", "B", "C"],
//     range: "A4:A5", // + info[1]
//     raw: true,
// })
// console.log("jdata === ", jdata)
//
