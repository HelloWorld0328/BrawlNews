import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

const App = () => {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    goHome();
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
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
        <!-- 단축키 테이블 -->
      </table>
    `;
  };

  const showInfo = () => {
    page = "info";
    document.getElementById("app").innerHTML = `
      <!-- 정보 페이지 내용 -->
    `;
  };

  const goNew = () => {
    page = "new";
    document.getElementById("app").innerHTML = `
      <!-- 글 작성 폼 -->
    `;
  };

  const sendPost = () => {
    const name = document.getElementById("nameForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const title = document.getElementById("titleForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const content = document.getElementById("contentForm").value.replace(/\n/g, "\\n").replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const send = {
      name: name.replace(/(['"])/g, "\\$1"),
      title: title.replace(/(['"])/g, "\\$1"),
      content: content.replace(/(['"])/g, "\\$1"),
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
        response.data.forEach((item, index) => {
          const post = document.createElement("h3");
          post.id = index;
          post.textContent = item.title;
          post.addEventListener('click', () => showContent(item.name, item.title, item.content, item.id, item.comment));
          document.getElementById("app").appendChild(post);
        });
      })
      .catch(error => {
        console.log('에러: ', error);
      });
  };

  const showContent = (name, title, content, id, comments) => {
    document.getElementById("app").innerHTML = `
      <h1>${title}</h1>
      <h3>글쓴이: ${name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id:${id}</h3>
      <h4 style="white-space: pre-line;">${content}</h4>
    `;
  };

  return (
    <div>
      <img src="https://i.ibb.co/swDxGsv/2023-10-27-083110.png" alt="logo" id="logo" />
      <span className="nv nowrap" id="home" onClick={goHome}>홈</span>
      <span className="nv nowrap" id="new" onClick={goNew}>작성</span>
      <span className="nv nowrap" id="brawlnews" onClick={showInfo}>정보</span>
      <span className="nv nowrap" id="shortkey" onClick={shortkey}>단축키</span>
      <nav id="navbar">
        {/* 네비게이션 바 요소 */}
      </nav>
      <div id="navToApp"></div>
      <div id="app"></div>
    </div>
  );
};
  


ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export default App;