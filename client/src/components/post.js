import React, { useEffect, useState } from "react";

const Post = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post")
      .then((response) => response.json())
      .then((data) => {
        const promises = data.map((post) =>
          fetch(`http://localhost:5000/user/${post.user_id}`)
            .then((response) => response.json())
            .then((user) => ({ ...post, user }))
        );
        return Promise.all(promises);
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <p>{post.prompt}</p>
            <p>Posted by: {post.user ? post.user.username : "Anonymous"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Post;