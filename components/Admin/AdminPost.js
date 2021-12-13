import { useState, useRef } from "react";
import Image from "next/image";
import Modal from "../Modal";
import { Dialog } from "@headlessui/react";
import { createPost } from "../../utils/post";
import { useAuth } from "../../utils/auth";

export default function AdminPost({ post }) {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setOpenModal] = useState(false);
  const cancelButtonRef = useRef(null);
  if(!post){
    post = {}
    post.id = 'this post has no data'
    post.title = 'this post has no title'
    post.description = 'this post has no description'
  }
  let newPostTitle = post.title
  let newPostDescription = post.description
  let privatePostCheckbox = false
  const auth = useAuth();

  return (
    post ?
    (
    <div
      key={post.id}
      className="card m-10 p-10 relative hover:bg-gray-100"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* TODO: handle correct functionality for deleting a post (confirmation Dialog too) */}
      <div onClick={() => onUpdateSection(null)} className={
        "top-1 right-1 cursor-pointer" + (isHover ? " absolute" : " hidden")
        }>
        {/* close icon button */}
        <Image alt="" src="/icons/delete.svg" height="40" width="40" />
      </div>
      <div className="flex">
        <div className="w-full align-middle my-auto">
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
        <div onClick={() => setOpenModal(true)} className="bottom-1 left-1 cursor-pointer">
          {/* edit icon button */}
          <Image alt="" src="/icons/edit.svg" height="40" width="40" />
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
        <>
                <div className='xm:flex xm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                     Edit Post
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                        <input
                            id="newPostTitleInput"
                            name="newPostTitleInput"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Title"
                            ini
                            onChange={e => {
                                newPostTitle = e.target.value
                            }}
                        />
                        </div>
                        <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                        <input
                            id="newPostDescription"
                            name="newPostDescription"
                            type="textarea"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Description"
                            onChange={e => {
                                newPostDescription = e.target.value
                            }}
                        />
                        </div>
                        </div>
                        <section className="container mx-0 p-5">
                            <label htmlFor="checkbox" className="relative flex-inline items-center isolate p-4 rounded-2xl">
                              {/* TODO: dreate dropdown with status: public, private, deleted */}
                                <input id="checkbox" type="checkbox" onChange={e => {privatePostCheckbox = e.target.value}} className="relative peer z-20 text-purple-600 rounded-md focus:ring-0" />
                                <span className="ml-2 relative z-20">post status</span>
                                <div className="absolute inset-0 bg-white peer-checked:bg-purple-50 peer-checked:border-purple-300 z-10 border rounded-2xl"></div>
                            </label>
                        </section>
                    </div>
                      </p>
                    </div>
                  </div>
                </div>
              <div className='bg-gray-50 px-4 py-3 xm:px-6 xm:flex xm:flex-row-reverse'>
                 {/* TODO: handle correct save functionality */}
                <button
                  type='button'
                  className='btn'
                  onClick={() => {setOpenModal(false); createPost(auth.userId, newPostTitle, newPostDescription, privatePostCheckbox)}}
                >
                  Save
                </button>
                <button
                  type='button'
                  className='btn bg-gray-50 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => setOpenModal(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                </div>
                </>
      </Modal>
    </div>
    ) : (
      <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
      <div className='xm:flex xm:items-start'>
        <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
          <Dialog.Title
            as='h3'
            className='text-lg leading-6 font-medium text-gray-900'
          >
          This Post has no Data
          </Dialog.Title>
          <button
          type='button'
          className='btn bg-gray-50 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          onClick={() => setOpenModal(false)}
          ref={cancelButtonRef}
        >
          OK
        </button>
        </div>
      </div>
      </Modal>
    )
  );
}
