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

  let newPostTitle = ''
  let newPostDescription = ''

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
        <>
            <div className="m-2 btn w-1/12">
                <button onClick={() => setOpenModal(true)}>
                    Neuer Post
                </button>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
                <>
                <div className='xm:flex xm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Neuer Post erstellen
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
                            placeholder="Titel"
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
                            placeholder="Beschreibung"
                            onChange={e => {
                                newPostDescription = e.target.value
                            }}
                        />
                        </div>
                        </div>
                    </div>
                      </p>
                    </div>
                  </div>
                </div>
              <div className='bg-gray-50 px-4 py-3 xm:px-6 xm:flex xm:flex-row-reverse'>
                <button
                  type='button'
                  className='btn'
                  onClick={() => {setOpenModal(false); createPost(auth.userId, newPostTitle, newPostDescription, '0')}}
                >
                  Speichern
                </button>
                <button
                  type='button'
                  className='btn bg-gray-50 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  onClick={() => setOpenModal(false)}
                  ref={cancelButtonRef}
                >
                  Abbrechen
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
