import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function AdminPost({ post }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      key={post.id}
      className="card m-10 p-10 relative hover:bg-gray-100"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div
        onClick={() => {
          onUpdateSection(null);
        }}
        className={
          "-top-3 -left-3 cursor-pointer" + (isHover ? " absolute" : " hidden")
        }
      >
        <Image alt="" src="/icons/delete.svg" height="40" width="40" />
      </div>
      <div className="flex">
        <div className="w-full align-middle my-auto">
          <p>{post.title}</p>
        </div>
        <div>
          <Image alt="" src="/icons/edit.svg" height="40" width="40" />
        </div>
      </div>
    </div>
  );
}
