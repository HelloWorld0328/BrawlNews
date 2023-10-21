const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json()); // JSON 데이터 파싱
app.use(bodyParser.urlencoded({ extended: true }));

// JSON 파일 경로
const jsonFilePath = __dirname + "/posts.json";

// JSON 파일을 읽어오는 함수
function readJson() {
  try {
    const data = fs.readFileSync(jsonFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// JSON 파일에 데이터를 저장하는 함수
function writeJson(data) {
  fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");
}

// 루트 경로
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// 모든 포스트 가져오기
app.get('/posts', (req, res) => {
  function getreq() {
    return fetch("https://port-0-brawlnewsbackend-euegqv2blnzz6di0.sel5.cloudtype.app/read")
      .then((response) => {
        if (!response.ok) {
          throw new Error('네트워크 오류');
        }
        return response.json(); // JSON 데이터를 파싱하여 반환
      });
  }

  getreq()
    .then((data) => {
      res.json(data); // JSON 데이터를 응답으로 보냄
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: '데이터 가져오기 오류' }); // 오류 응답을 클라이언트로 보냄
    });
});


// 새로운 포스트 추가
// app.post('/upload', (req, res) => {
//   const get = req.body;
//   const reqjsondata=JSON.stringify(get)
//   const reqdata=JSON.parse(reqjsondata)
//   console.log(reqdata);

//   // JSON 파일에서 데이터 읽기
//   const posts = readJson();

//   // 새로운 데이터 추가
//   posts.push(reqdata);

//   // JSON 파일에 데이터 저장
//   writeJson(posts);

//   res.json({ message: '데이터가 성공적으로 추가되었습니다.' });
// });

app.post('/upload', (req, res) => {
  const dataToSend = req.body; // 클라이언트로부터 받은 데이터

  // 서버에 POST 요청을 보내기 위한 옵션 설정
  const requestOptions = {
    method: 'POST', // 요청 메서드
    headers: {
      'Content-Type': 'application/json', // 요청 헤더 설정
    },
    body: JSON.stringify(dataToSend), // 데이터를 JSON 문자열로 변환하여 전송
  };

  fetch('https://port-0-brawlnewsbackend-euegqv2blnzz6di0.sel5.cloudtype.app/write', requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error('네트워크 오류');
      }
      return response.json();
    })
    .then((responseData) => {
      // 서버로부터의 응답 처리
      res.json(responseData); // 클라이언트에 응답 보내기
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: '데이터 업로드 오류' }); // 오류 응답을 클라이언트로 보내기
    });
});


app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
