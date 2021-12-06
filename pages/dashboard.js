import Head from "next/head";
import { useAuth } from "../utils/auth";
import { getPosts, createPost } from "../utils/post";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const posts = async () => {
      setPosts(await getPosts());
    };

    posts();
  }, []);

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth.userId && (
          <div className="m-2">
          <button onClick={() => createPost(auth.userId, 'postTitle', 'postDescription', '0')}>
              Neuer Post
          </button>
        </div>
      )}
      
      <div className="m-10">
        {posts.map((post) => {
          return (
            <div key="privatePosts" className="card m-10 p-10">
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
