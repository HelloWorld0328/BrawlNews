//시스템 변수선언
const express=require('express')
const fs = require('fs')
const app=express()
const port=3000

//json읽기
function readJson(){
    var a=fs.readFileSync(__dirname+"/posts.json","utf-8")
    return a
}
function writeJson(chg){
    var read=fs.readFileSync(__dirname+"/posts.json","utf-8")
    var readData=JSON.parse(read)
    readData.append(chg)
    read=JSON.stringify(readData)
    return(read)
    
}
//라우팅
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


//서버
app.get('/posts',(req,res)=>{
    // res.send(JSON.stringify([{title:"테스트",content:"테스트 글입니다."}]))
    res.send(readJson())
})
app.post('/upload',(req,res)=>{
    console.log("req:"+req)
    res.send(JSON.parse(req))
})

//리스닝
app.listen(port,()=>{console.log(`listening on ${port}!`)})