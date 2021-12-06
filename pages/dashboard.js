import Head from "next/head";
import { useAuth } from "../utils/auth";
import { getPosts, createPost } from "../utils/post";
import { useState, useEffect, useRef } from "react";
import Modal from "../components/Modal"
import { Dialog } from "@headlessui/react";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setOpenModal] = useState(false);
  const auth = useAuth();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    const posts = async () => {
      setPosts(await getPosts());
    };

    posts();
  }, []);

  // create Post: createPost(auth.userId, 'postTitle', 'postDescription', '0')

  return (
    <div>
      <Head>
        <title>Dashboard</title>
        <meta name="description"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth.userId && (
        <>
            <div className="m-2 btn w-1/12">
                <button onClick={() => setOpenModal(true)}>
                    Neuer Post
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
                <>
                <div className='sm:flex sm:items-start'>
                  <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Deactivate account
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => setOpenModal(false)}
                >
                  Deactivate
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                  onClick={() => setOpenModal(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
                </div>
                </>
            </Modal>
        </>
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
