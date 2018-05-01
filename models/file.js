var fs = require("fs");
exports.getAllAlbums = function(callback) {
    fs.readdir("./uploads",function (err,files) {
        var Allalbums = [];
        if(err) {
            callback("找不到uploads文件",null);
        }
        (function iterator(i) {
            if (i == files.length) {
                callback(null, Allalbums);
                return;
            }
            fs.stat("./uploads/" + files[i], function (err,stats) {
                if(err) {
                    callback("找不到"+files[i],null);
                }
                if (stats.isDirectory()) {
                    Allalbums.push(files[i]);
                }
                iterator(i+1);
            })
           
        })(0)
    })
}
exports.getAllAlbumSrc = function(albumName,callback) {
    fs.readdir("./uploads/" + albumName, function (err, files) {
        var albumArray = [];
        if (err) {
            callback("找不到文件", null);
            return;
        }
        (function iterator(i) {
            if (i == files.length) {
                callback(null, albumArray);
                return;
            }
            fs.stat("./uploads/" + albumName + "/" + files[i], function (err, stats) {
                if (err) {
                    callback("找不到" + files[i], null);
                    return;
                }
                if (stats.isFile()) {
                    albumArray.push(files[i]);
                }
                iterator(i + 1);
            })

        })(0)
    })
}
