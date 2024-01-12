// 라이브러리 임포트
import React, { useEffect, useState } from "react";
import axios from "axios";

// 컴포넌트 임포트하는거
import Hotkey from "./components/Hotkey"
import Home from "./components/Home"
import Info from "./components/Info"
import New from "./components/New"
import Quiz from "./components/Quiz";

// 서버주소
const server="https://bnbackend.onrender.com"
// const server="http://localhost:3030"


/* define App component */
const App=()=>{

  const sendComment= (id,date, views, name, title, content,comment)=>{
    const commentName=document.getElementById('inputCommentName').value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const commentContent=document.getElementById('inputCommentContent').value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    if(commentName===""){
      alert("이름을 입력해주세요.")
    }
    else if(commentContent===""){
      alert("댓글 내용을 입력해주세요.")
    }
    else if(commentName!=="" & commentContent!==""){
      console.log("댓글달림")
      const send = {
        name: commentName.replace(/(['"])/g, "\\$1"),
        content: commentContent.replace(/(['"])/g, "\\$1"),
        postId: id
      };
      axios.post(server+"/uploadcomment", send)
      .then(response => {
        console.log("서버로부터의 응답: ", response);
        alert("댓글이 작성되었습니다.")
        Navigate('home');
        showContent(date,views,name,title,content,id,comment)
      })
      .catch(error => {
        console.error("오류 발생: ", error);
      });
    }
  
  }
  const showContent = (date, views, name, title, content, id,comment) => {
    console.log("타입:"+typeof(SetHtml))
    let _content = content.replace(/\\(["'\\nt])/g, (match, p1) => {
      if (p1 === 'n') return '\n';
      if (p1 === 't') return '\t';
      if (p1 === '\\') return '\\\\'; // 백슬래시 처리
      if (p1 === '&lt;') return '<'; // 부등호(`<`) 처리
      if (p1 === '&gt;') return '>;'; // 부등호(`>`) 처리
      return p1;
  });
    

    
    viewsUP(id)
    SetHtml(
      <div>
        <h1 id="title">{title}</h1>
        <h3>글쓴이 : {name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : {id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수 : {views}</h3>
        <h3>날짜 : {date}</h3>
        <h4 style={{ whiteSpace: 'pre-line' }} id="content">{_content}</h4>
        <hr />
        <div className="viewComment">
        {comment && Array.isArray(comment) && comment.map((val,idx) => (
  <h3 key={idx}>
    {val.name}&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;{val.content}
  </h3>
))}

        </div><br /><br /><br />

        <div className="comment">
          <div className="InputComment">
          <input id="inputCommentName" placeholder="이름입력" type="text"/><br />
          <textarea style={{ width: '50%', height: '75px' }} type="text" id="inputCommentContent" placeholder="댓글입력"></textarea><br /><br /><br />  
          <button id="commentSend" className="nocenter" onClick={()=>sendComment(id)}>등록</button>
          </div>
        </div>
      </div>
    );}

    
  /**
   * 한국날짜 
   * @returns 한국날짜
   */
  const krdate=()=>{
    const koreanLocale = 'ko-KR';
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
        timeZone: 'Asia/Seoul'
      };
      
      const koreanTime = new Date().toLocaleString(koreanLocale, options);
      return(koreanTime)
  }

  const sendPost = () => {
    console.log(krdate())
    try{
      const name = document.getElementById("nameForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const title = document.getElementById("titleForm").value.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      const content = document.getElementById("contentForm").value.replace(/\n/g, "\\n").replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    if(name===""){
      alert("이름을 입력해주세요.")
    }
    else if(title===""){
      alert("재목을 입력해주세요.")
    }
    else if(content===""){
      alert("내용을 입력해주세요.")
    }
    else if(name!=="" & title!=="" & content!==""){
    }
    const send = {
      name: name.replace(/(['"])/g, "\\$1"),
      title: title.replace(/(['"])/g, "\\$1"),
      content: content.replace(/(['"])/g, "\\$1"),
      views: 0,
      date: krdate()
    };

    axios.post(server+"/upload", send)
      .then(response => {
        console.log("서버로부터의 응답: ", response);
        Navigate('home')
      })
      .catch(error => {
        console.error("오류 발생: ", error);
      });
    }catch{}
  };


  const viewsUP = (id) => {
    axios.post(`${server}/viewup`, { id: id })
      .then((res) => { console.log(res) })
      .catch(err => { console.error("조회수 추가 에러: ", err); });
  };
  


  // 단축키 할때 필요한 useEffect
  useEffect(() => {
    Navigate('home')
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /**
   * 단축키
   * @param {string} event 입력한거
   */
  const handleKeyPress = (event) => {
    const { altKey, key } = event;
    if (altKey) {
      switch (key) {
        case 'h':
          Navigate('home')
          break;
        case 'Enter':
          sendPost()
          break;
        case 'i':
          Navigate('info')
          break;
        case 'n':
          Navigate('new')
          break;
        case 's':
          Navigate('hotkey')
          break;
        default:
          break;
      }
    }
  };

  const [html,SetHtml]=useState(<Home showContent={showContent} server={server}/>)

  /**
   * 라우트 하는거
   * @param {str} route
   */
  const routing=(route)=>{
    switch (route){
      
      case 'home':
        SetHtml(<Home showContent={showContent} server={server}/>);
        break;
      case 'hotkey':
        SetHtml(<Hotkey />)
        break
      case 'info':
        SetHtml(<Info />)
        break
      case 'new':
        SetHtml(<New Navigate={Navigate} sendPost={sendPost} krdate={krdate}/>)
        break
      case 'quiz':
        SetHtml(<Quiz Navigate={Navigate}/>)
        break
      default:
        SetHtml("없음;;")
        break
    }
  }

  /**
   * routing함수와 합쳐도 상관X일듯
   * @param {str} navroute 갈곳
   */
  const Navigate=(navroute)=>{
    routing(navroute)
  }


  return(
    <div id="mainApp">
      <div id="navbar">
        <img src="https://i.ibb.co/swDxGsv/2023-10-27-083110.png" alt="logo" id="logo" />
        <span className="nv nowrap" id="home" onClick={()=>Navigate('home')}>홈&nbsp;&nbsp;</span>
        <span className="nv nowrap" id="new" onClick={()=>{Navigate('new')}}>작성&nbsp;&nbsp;</span>
        <span className="nv nowrap" id="brawlnews" onClick={() => Navigate('info')}>정보&nbsp;&nbsp;</span>
        <span className="nv nowrap" id="shortkey" onClick={()=>Navigate('hotkey')}>단축키&nbsp;&nbsp;</span>
        <span className="nv nowrap" id="quiz" onClick={()=>Navigate('quiz')}>퀴즈&nbsp;&nbsp;</span>
      </div>

      <br />
      <br />
      <br />

      <div id="app">
        {html}
      </div>
    </div>
  )
}

export default App;