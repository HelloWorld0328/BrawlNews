import React, { useEffect, useState } from "react";
import axios from "axios";

const server="https://express.zandibatch.repl.co"
const Home = ({SetHtml}) => {
  console.log("타입"+typeof(SetHtml))
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      // req posts(type:array) 
      axios.get(server + '/posts')
        .then(response => {
          const postsData = response.data.map((item, index) => (
            <h3 key={index} id={index} onClick={() => showContent(item.date, item.views, item.name, item.title, item.content, item.id,SetHtml)}>
              {item.title}
            </h3>
          ));
  
          setPosts(postsData.reverse());
  
        })
        // catch err
        .catch(err => {
          console.error('에러: ', err);
        });
        //eslint-disable-next-line
    }, []);
  
    return (
      <div id="posts">
        {posts}
      </div>
    );
  };

  const viewsUP = (id) => {
    axios.post(`${server}/viewup`, { id: id })
      .then((res) => { console.log(res) })
      .catch(err => { console.error("조회수 추가 에러: ", err); });
  };
  
  
  const showContent = (date, views, name, title, content, id,SetHtml) => {
    console.log("타입:"+typeof(SetHtml))
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
  export default Home;