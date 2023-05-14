import path from "path";
import express from "express";
import env from "dotenv"
env.config();
//下記でdb情報を読み込んで接続している
import apiRoutes from "./api-routes/index.mjs"
import "./helpers/db.mjs"
import cors from "cors"

const app = express();
const port = process.env.PORT || 8080;

app.use("/",express.static("build"))
app.use(express.json())

// app.use(cors({
//     origin:"*"
// }))

app.use("/api",apiRoutes)

app.get("*",function(req,res) {
    const indexHtml = path.resolve("build","index.html");
    res.sendFile(indexHtml)
})
// 基本的に上記のapp.useで処理が完了するため、上記で呼ばれない場合は
// 宛先がなかったなどのエラーのときのみの実行になる
app.use("/",(req,res)=>{
    res.status(404).json({msg:"Page Not Found"})
})

app.use(function(err,req,res,next) {
    //すでにresを返しているかの判定
    if(res.headerSent){
        return next(err)
    }
    res.status(500).json({msg:"不正なエラーが発生しました"})

})


app.listen(port,()=> {
    console.log(`Server Start:http://localhost:${port}`)
})