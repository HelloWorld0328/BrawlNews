const express = require('express');
const app = express();
const port = 3000;

// 루트 경로
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
