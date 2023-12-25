import React from "react";

const Quiz=({quizList , Navigate})=>{
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
        <h1 className="gradient">브롤스타즈 퀴즈</h1>
        <h3>질문:{ask}</h3>
        <input className="nocenter" placeholder="정답입력" id="ansForm" type="text"/><br/><br/>
        <button className="nocenter" id="send" onClick={()=>handleClick()}>입력</button>
      </div>
    )
  }

export default Quiz;