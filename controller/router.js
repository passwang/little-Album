var file = require("../models/file.js");
var formidable = require("formidable");
var path = require("path");
var fs = require("fs");
//首页
exports.showIndex = function (req,res,next) {
    file.getAllAlbums(function(err,allAlbums) {
        if(err) {
           next();
           return;
        }
       res.render("index",{
           "albums": allAlbums
       })
    })
}
//相册页
exports.showAlbumName = function (req,res,next) {
    var albumName = req.params.albumName;
    file.getAllAlbumSrc(albumName,function(err,albumArray) {
       if(err) {
           next();
           return;
       }
        res.render("album", {
            "albumName": albumName,
            "albumArray": albumArray
        })
    })
}
//上传页
exports.showUp = function(req,res) {
    file.getAllAlbums(function(err,allAlbums) {
       if (err) {
           next();
           return;
       }
       res.render("upload", {
           "albums": allAlbums
       })
    })
}
//表单提交
exports.doPost = function (req,res,next) {
    var form = new formidable.IncomingForm();
    form.uploadDir =path.normalize(__dirname + "/../" + "uploads/");
    form.parse(req, function (err, field, file) {
    var wenjianjia = field.filefile;
    var oldPath = file.file.path;
    var newPath = form.uploadDir + wenjianjia + "/" + file.file.name;
    fs.rename(oldPath,newPath,function (err) {
        if(err) {
            next();
            return;
        }
        res.send("成功");
    })
    });
}