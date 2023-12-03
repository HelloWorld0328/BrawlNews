import React, { useEffect } from 'react';
import axios from 'axios';
const App = () => {
  const server="https://port-0-brawlnewsbackend-12fhqa2blnxrtsyp.sel5.cloudtype.app"
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(() => {
    goHome()
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyPress = (event) => {
    const { altKey, key } = event;
    if (altKey) {
      switch (key) {
        case 'h':
          goHome();
          break;
        case 'Enter':
          if (page === "new") {
            sendPost();
          }
          break;
        case 'i':
          showInfo();
          break;
        case 'n':
          goNew();
          break;
        case 's':
          shortkey();
          break;
        default:
          break;
      }
    }
  };

  let page = "home";

  const shortkey = () => {
    document.getElementById("app").innerHTML = `
      <table>
      <tr>
      <th>단축키</th>
      <th>기능</th>
      <th>특이사항</th>
  </tr>
  <tr>
      <td>alt+h</td>
      <td>홈으로 가기</td>
      <td>홈일때 사용하면 글을 불러오는 기능으로 사용할수 있다.</td>
  </tr>
  <tr>
      <td>alt+Enter</td>
      <td>작성중이던 글 업로드</td>
      <td>작성화면에서만 사용가능</td>
  </tr>
  <tr>
      <td>alt+i</td>
      <td>정보페이지로 가기</td>
      <td>없음</td>
  </tr>
  <tr>
      <td>alt+n</td>
      <td>글 작성하기</td>
      <td>작성화면에서 누륀면 작성하던 글이 초기화되니 주의</td>
  </tr>
  <tr>
      <td>alt+s</td>
      <td>단축키 표시</td>
      <td>없음</td>
  </tr>
      </table>
    `;
  };

  const showInfo = () => {
    page = "info";
    document.getElementById("app").innerHTML = `
    <h1>브롤뉴스란?</h1>
    <h2>브롤뉴스는 브롤스타즈의 최신정보를 알려주고 </h2>
    <h2>사람들이 서로 브롤스타즈에 관련한 정보를</h2>
    <h2>주고 받을수 있게 도와줍니다.</h2>
    <br>
    <h1>개발도구</h1>
    <h3>Made by 류동윤</h3>
    <h3>FrontEnd:JQuery|Vanila css,html</h3>
    <h3>BackEnd:Express</h3>
    `;
  };

  const goNew = () => {
    page = "new";
    document.getElementById("app").innerHTML = `
    <input class="nocenter" placeholder="이름입력" id="nameForm" type="text"><br><br>
    <input class="nocenter" placeholder="재목입력" id="titleForm" type="text"><br><br>
    <textarea class="nocenter" placeholder="내용입력" id="contentForm" style="width: 80%; height: 150px; "></textarea><br><br>
    <button class="nocenter" id="send">저장</button>
    `;
    const send= document.getElementById("send")
    send.addEventListener("click",()=>{sendPost()})
  };

  const sendPost = () => {
    const name = document.getElementById("nameForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const title = document.getElementById("titleForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const content = document.getElementById("contentForm").value.replace(/\n/g, "\\n").replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const send = {
      name: name.replace(/(['"])/g, "\\$1"),
      title: title.replace(/(['"])/g, "\\$1"),
      content: content.replace(/(['"])/g, "\\$1"),
      views: 0
    };

    axios.post("https://port-0-brawlnewsbackend-12fhqa2blnxrtsyp.sel5.cloudtype.app/upload", send)
      .then(response => {
        console.log("서버로부터의 응답: ", response);
        goHome();
      })
      .catch(error => {
        console.error("오류 발생: ", error);
      });
  };

  const goHome = () => {
    page = "home";
    axios.get('https://port-0-brawlnewsbackend-12fhqa2blnxrtsyp.sel5.cloudtype.app/posts')
      .then(response => {
        document.getElementById("app").innerHTML = "";
        response.data.slice().reverse().forEach((item, index) => {
          const post = document.createElement("h3");
          post.views= item.views
          post.id = index;
          post.textContent = item.title;
          post.addEventListener('click', () => showContent(item.views,item.name, item.title, item.content, item.id, item.comment));
          document.getElementById("app").appendChild(post);
        });
      })
      .catch(error => {
        console.log('에러: ', error);
      });
  };

  const showContent = (views,name, title, content, id, comments) => {
    //xss막는기능
    let _content=content.replace(/\\(["'\\nt])/g, (match, p1) => {
      if (p1 === 'n') return '\n';
      if (p1 === 't') return '\t';
      return p1;
    });

    //조회수 처리하는 기능
    viewsUP(id)
    console.log(views)
    // 글 만들기
    document.getElementById("app").innerHTML = `
      <h1>${title}</h1>
      <h3>글쓴이: ${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:${id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수:${views}</h3>
      <h4 style="white-space: pre-line;" id="content">${_content}</h4>
    `;
  };

  // 글 보면 서버에게 글id를 post로 전달. 서버는 받은 id의 글을찾아 조회수 ++해줌
  const viewsUP = (id) => {
    axios.post(`${server}/viewup`, { id: id }) // 서버 주소를 문자열 템플릿으로 변환하여 보내주시면 됩니다.
      .then((res) => { console.log(res) })
      .catch(err => { console.error("조회수 추가 에러: ", err); }); // 오류 처리 추가
  };
  return (
    <div>
      <img src="https://i.ibb.co/swDxGsv/2023-10-27-083110.png" alt="logo" id="logo" />
      <span className="nv nowrap" id="home" onClick={goHome}>홈&nbsp;&nbsp;</span>
      
      <span className="nv nowrap" id="new" onClick={goNew}>작성&nbsp;&nbsp;</span>
      <span className="nv nowrap" id="brawlnews" onClick={showInfo}>정보&nbsp;&nbsp;</span>
      <span className="nv nowrap" id="shortkey" onClick={shortkey}>단축키&nbsp;&nbsp;</span>
      <nav id="navbar">
        {/* 네비게이션 바 요소 */}
      </nav>
      <div id="app"></div>
    </div>
  );
};


export default App;