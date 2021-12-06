import { useState, useEffect } from "react";
import { getPosts } from "../utils/post";
import Link from "next/link";
import Image from "next/image";
import AdminPost from "../components/Admin/AdminPost";

export default function Admin() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const posts = async () => {
      setPosts(await getPosts());
    };

    posts();
  }, []);

  return (
    <div>
      <h1>Admin Page</h1>
      <div className="w-1/2 m-auto">
        {posts.map((post) => {
          return <AdminPost post={post} />;
        })}
      </div>
    </div>
  );
}
