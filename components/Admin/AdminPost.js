import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Modal from "../Modal";

export default function AdminPost({ post }) {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
          <Image alt="" src="/icons/edit.svg" height="40" width="40" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>{post.id}</p>
        <div>
          <p className="font-bold">Title</p>
          <input value={post.title} />
        </div>
        <div>
          <p className="font-bold">Description</p>
          <input value={post.description} />
        </div>
        <div>
          <p className="font-bold">Status</p>
          <input value={post.status} />
        </div>
      </Modal>
    </div>
  );
}
