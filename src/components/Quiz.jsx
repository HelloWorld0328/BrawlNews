import React from "react";

// 변수
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

const Quiz=({Navigate})=>{
    let min = 0;
    let max = quizList.length - 1;
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
    const ask = quizList[randomNumber].quiz;
    const ans = quizList[randomNumber].ans;
    /** 맞는지 확인하는 함수 */
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
        <h1 className="gradient">브롤스타즈 퀴즈</h1>
        <h3>질문:{ask}</h3>
        <input className="nocenter" placeholder="정답입력" id="ansForm" type="text"/><br/><br /><br/>
        <button className="nocenter" id="send" onClick={()=>handleClick()}>입력</button>
      </div>
    )
  }

export default Quiz;