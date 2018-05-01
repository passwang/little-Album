var express = require("express");
var app = express();
var router = require("./controller");
//设置模板引擎
app.set("view engine","ejs");
app.use(express.static("./views"));
//静态页面
app.use(express.static("./public"));
app.use(express.static("./uploads"));
//首页
app.get("/",router.showIndex);
app.get("/:albumName",router.showAlbumName);
app.get("/upload",router.showUp);
app.post("/form", router.doPost);
//最后的最后
app.use(function (req,res) {
    res.render("err");
})
app.listen(3000);
