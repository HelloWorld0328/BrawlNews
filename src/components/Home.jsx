import React, { useEffect, useState } from "react";
import axios from "axios";


const Home = ({showContent,server}) => {
  console.log("ttt:"+typeof(showContent))
  const [posts, setPosts] = useState([]);

    useEffect(() => {
      // Get요청 보내기
      axios.get(server + '/posts')
        .then(response => {
          const postsData = response.data.map((item, index) => (
            <h3 key={index} id={index} onClick={() => showContent(item.date, item.views, item.name, item.title, item.content, item.id, item.comment)}>
              {item.title}
            </h3>
          ));
  
          setPosts(postsData.reverse());
  
        })
        // 에러처리
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



export default Home;