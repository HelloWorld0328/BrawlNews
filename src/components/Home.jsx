import React, { useEffect, useState } from "react";
import axios from "axios";

const server="https://express.zandibatch.repl.co"


const Home = ({showContent}) => {
  console.log("ttt:"+typeof(showContent))
  const [posts, setPosts] = useState([]);

    useEffect(() => {
      // req posts(type:array) 
      axios.get(server + '/posts')
        .then(response => {
          const postsData = response.data.map((item, index) => (
            <h3 key={index} id={index} onClick={() => showContent(item.date, item.views, item.name, item.title, item.content, item.id)}>
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



export default Home;