import React, { useEffect, useState } from "react";
import axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const { data } = await axios.get("http://localhost:5000/posts");
      const { posts } = data;
      setPosts(posts);
    };
    getPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <p>{post.prompt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;