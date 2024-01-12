import React from "react";

const New=({Navigate,krdate,sendPost})=>{
    /** 유저가 쓴거 가저와서 올리는거 */
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
      sendPost({krdate},{Navigate})
    }}

    return(
      <div className="New">
        <input class="nocenter" placeholder="이름입력" id="nameForm" type="text"/>
        <input class="nocenter" placeholder="재목입력" id="titleForm" type="text"/><br/><br/>
        <textarea className="nocenter" placeholder="내용입력" id="contentForm" style={{ width: '60%', height: '125px' }} ></textarea><br /><br /><br />
        <button class="nocenter" id="send" onClick={()=>{send()}}>등록</button>
      </div>
    )
  }

export default New;