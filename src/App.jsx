// import Library
import React, { useEffect, useState } from "react";
import axios from "axios";

// define variable
const server="https://express.zandibatch.repl.co"
const quizList=[
  {quiz:"브롤스타즈의 유일한 기본 브롤러는?", ans:"쉘리"},
  {quiz:"브롤스타즈의 정식버전 출시년은?", ans:"2018년"},
  {quiz:"브롤스타즈의 이용 등급은?", ans:"만 7세 이상 이용가"},
  {quiz:"브롤스타즈가 지원하는 언어의 갯수는?", ans:"22개"},
  {quiz:"브롤스타즈가 서비스중단된 국가중 이름이 3글자인 나라는?", ans:"러시아"},
  {quiz:"브롤스타즈의 배급사의 영어이름은?", ans:"Supercell"},
  {quiz:"레온은 브롤스타즈 처음부터 나온 브롤러일까? (O또는X로 대답)",ans:"O"},
  {quiz:"쉘리는 처음부터 기본 지급을 했던 브롤러다? (O또는X로 대답)",ans:"O"},
  {quiz:"최초로 2만을 찍은 사람은 3인큐를 돌려서 찍었는데 그 팀큐중 1명도 최초 ?만을 찍었는데요, 그러면 몇만을 찍었을까요?",ans:"3만"},
  {quiz:"2만을 최초로 찍은 사람은 어느 나라 사람일까요?",ans:"한국인"}
]

/* define App component */
const App=()=>{
  /** Home component is load and show posts. */
  const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // req posts(type:array) 
      axios.get(server + '/posts')
        .then(response => {
          const postsData = response.data.map((item, index) => (
            <h3 key={index} id={index} onClick={() => showContent(item.date, item.views, item.name, item.title, item.content, item.id, item.comment)}>
              {item.title}
            </h3>
          ));
  
          setPosts(postsData.reverse());
  
        })
        // catch err
        .catch(err => {
          console.error('에러: ', err);
        });
    }, []);
  
    return (
      <div id="posts">
        {posts}
      </div>
    );
  };

  /** Hotkey component is let know Hotkeys. */
  const Hotkey=()=>{
    return(
      <div>
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
              <td>작성화면에서 누르면 작성하던 글이 초기화되니 주의</td>
          </tr>
          <tr>
              <td>alt+s</td>
              <td>단축키 표시</td>
              <td>없음</td>
          </tr>
        
        </table>
      </div>
    )
  }
  
  /** Info component is let know Brawlnews`s infomation. */
  const Info = () => {
    return (
      <div>
        <h1>브롤뉴스란?</h1>
          <h2>브롤뉴스는 브롤스타즈의 최신정보를 알려주고 </h2>
          <h2>사람들이 서로 브롤스타즈에 관련한 정보를</h2>
          <h2>주고 받을수 있게 도와줍니다.</h2>
        <br/>
        <h1>개발도구</h1>
          <h3>Made by 류동윤</h3>
          <h3>FrontEnd:React</h3>
          <h3>BackEnd:Express</h3>
          <br/>
        <h1>깃허브</h1>
          <h3><a href="https://github.com/HelloWorld0328">개발자</a></h3>
          <h3><a href="https://github.com/HelloWorld0328/BrawlNews">프론트앤드</a></h3>
          <h3><a href="https://github.com/HelloWorld0328/BrawlnewsBackend">백앤드</a></h3>
      </div>
    )
  }
  
  /** New component is help you write. */
  const New=()=>{
    const send=()=>{
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
      sendPost()
    }}

    return(
      <div className="New">
        <input class="nocenter" placeholder="이름입력" id="nameForm" type="text"/>
        <input class="nocenter" placeholder="재목입력" id="titleForm" type="text"/><br/><br/>
        <textarea className="nocenter" placeholder="내용입력" id="contentForm" style={{ width: '80%', height: '150px' }} ></textarea><br /><br />
        <button class="nocenter" id="send" onClick={()=>{send()}}>저장</button>
      </div>
    )
  }

  /** Quiz component is give a quiz. */
  const Quiz=()=>{
    let min = 0;
    let max = quizList.length - 1;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    const ask = quizList[randomNumber].quiz;
    const ans = quizList[randomNumber].ans;
    const handleClick = () => {
      const userAnswer = document.getElementById("ansForm").value;
      if (userAnswer === ans) {
        alert("맞음");
        Navigate('quiz')
      } else {
        alert("틀림");
      }
    };
    return(
      <div>
        <h1>브롤스타즈 퀴즈</h1>
        <h3>질문:{ask}</h3>
        <input className="nocenter" placeholder="정답입력" id="ansForm" type="text"/><br/><br/>
        <button className="nocenter" id="send" onClick={()=>handleClick()}>입력</button>
      </div>
    )
  }

  /**
   * viewsUp function is increase views.
   * @param {number} id 
   */
  const viewsUP = (id) => {
    axios.post(`${server}/viewup`, { id: id })
      .then((res) => { console.log(res) })
      .catch(err => { console.error("조회수 추가 에러: ", err); });
  };
  
  
  const showContent = (date, views, name, title, content, id, comment) => {
    let _content = content.replace(/\\(["'\\nt])/g, (match, p1) => {
      if (p1 === 'n') return '\n';
      if (p1 === 't') return '\t';
      return p1;
    });
  
    viewsUP(id)
  
    console.log("쇼컨"+date+views+name+title+content+id)
    SetHtml(
      <div>
        <h1 id="title">{title}</h1>
        <h3>글쓴이 : {name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;id : {id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;조회수 : {views}</h3>
        <h3>날짜 : {date}</h3>
        <h4 style={{ whiteSpace: 'pre-line' }} id="content">{_content}</h4>
      </div>
    );
  };
  
  /** sendPost function is upload post. */
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

  /**
   * krdate function is return korea`s date and time.
   * @returns korea`s date and time
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

  // This useEffect function is make can use Hotkey function.
  useEffect(() => {
    Navigate('home')
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  /**
   * handleKeyPress function is define Hotkeys.
   * @param {string} event key`s value
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

  /** html variable is set App`s html */
  let [html,SetHtml]=useState(<Home/>)

  /**
   * routing function is route htmls
   * @param {str} route route to move
   */
  const routing=(route)=>{
    switch (route){
      
      case 'home':
        SetHtml(<Home />)
        break
      case 'hotkey':
        SetHtml(<Hotkey />)
        break
      case 'info':
        SetHtml(<Info />)
        break
      case 'new':
        SetHtml(<New />)
        break
      case 'quiz':
        SetHtml(<Quiz />)
        break
      default:
        SetHtml("그딴건 없다")
        break
    }
  }

  /**
   * Navigate function is move pages
   * @param {str} navroute route to move
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