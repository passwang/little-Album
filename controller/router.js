var file = require("../models/file.js");

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