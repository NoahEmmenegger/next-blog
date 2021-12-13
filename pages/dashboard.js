import { useState, useEffect, useRef } from "react";

import { useAuth } from "../utils/auth";
import { getPosts, createPost } from "../utils/post";

import Modal from "../components/Modal";

import Head from "next/head";
import { Dialog } from "@headlessui/react";

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setOpenModal] = useState(false);
  const auth = useAuth();
  const cancelButtonRef = useRef(null);

  let newPostTitle = "";
  let newPostDescription = "";
  let privatePostCheckbox = false;

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
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth.userId && (
        <>
          <div className="m-2 btn w-1/12">
            <button onClick={() => setOpenModal(true)}>New Post</button>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setOpenModal(false)}>
            <>
              <div className="xm:flex xm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    create New Post
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                          <input
                            id="newPostTitleInput"
                            name="newPostTitleInput"
                            type="text"
                            required
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Title"
                            onChange={(e) => {
                              newPostTitle = e.target.value;
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
                              onChange={(e) => {
                                newPostDescription = e.target.value;
                              }}
                            />
                          </div>
                        </div>
                        <section className="container mx-0 p-5">
                          <label
                            htmlFor="checkbox"
                            className="relative flex-inline items-center isolate p-4 rounded-2xl"
                          >
                            <input
                              id="checkbox"
                              type="checkbox"
                              onChange={(e) => {
                                privatePostCheckbox = e.target.value;
                              }}
                              className="relative peer z-20 text-purple-600 rounded-md focus:ring-0"
                            />
                            <span className="ml-2 relative z-20">
                              private post
                            </span>
                            <div className="absolute inset-0 bg-white peer-checked:bg-purple-50 peer-checked:border-purple-300 z-10 border rounded-2xl"></div>
                          </label>
                        </section>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 xm:px-6 xm:flex xm:flex-row-reverse">
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    setOpenModal(false);
                    createPost(
                      auth.userId,
                      newPostTitle,
                      newPostDescription,
                      privatePostCheckbox
                    ).then(async () => setPosts(await getPosts()));
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn bg-gray-50 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
