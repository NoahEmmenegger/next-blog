import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { getPosts } from "../utils/post";
import { useState, useEffect } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = async () => {
      setPosts(await getPosts());
    };

    posts();
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="m-10">
        {posts.map((post) => {
          return (
            <Link key={post.id} href={`/posts/${post.id}`}>
              <a>
                <div className="card m-10 p-10">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
