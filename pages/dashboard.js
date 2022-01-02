import { useState, useEffect, useRef } from "react";

import { useAuth } from "../utils/auth";
import { createPost, getUserPostsById } from "../utils/post";

import Modal from "../components/Modal";

import Head from "next/head";
import { Dialog } from "@headlessui/react";
import AdminPost from "../components/Admin/AdminPost";
import Link from "next/link";

export default function Dashboard() {
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setOpenModal] = useState(false);
    const auth = useAuth();
    const cancelButtonRef = useRef(null);

    useEffect(() => {
        const posts = async () => {
            if (auth.userId) {
                setPosts(await getUserPostsById(auth.userId));
            }
        };

        posts();
    }, [auth.userId]);

    if (!posts) {
        createPost(
            auth?.userId,
            "you don't have any posts yet!",
            "delete this one and create your first post with the button on your left :)",
            "private"
        );
    }

    let newPostTitle = "";
    let newPostDescription = "";

    return (
        <div>
            <Head>
                <title>Dashboard</title>
                <meta name="description" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {auth.user && auth.isFullyAuthenticated ? (
                <>
                    <div className="m-2 btn w-1/12">
                        <button onClick={() => setOpenModal(true)}>
                            New Post
                        </button>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setOpenModal(false)}
                    >
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
                                                            newPostTitle =
                                                                e.target.value;
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
                                                                newPostDescription =
                                                                    e.target
                                                                        .value;
                                                            }}
                                                        />
                                                    </div>
                                                </div>
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
                                            auth?.userId,
                                            newPostTitle,
                                            newPostDescription,
                                            "private"
                                        ).then(async () =>
                                            setPosts(
                                                await getUserPostsById(
                                                    auth.userId
                                                )
                                            )
                                        );
                                    }}
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={() => setOpenModal(false)}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    </Modal>
                    {posts ? (
                        <div className="m-10">
                            {posts.map((post, index) => {
                                return (
                                    <AdminPost
                                        post={post}
                                        onUpdatePost={(updatedPost) => {
                                            const updatedPosts = [...posts];
                                            if (updatedPost) {
                                                updatedPosts[index] =
                                                    updatedPost;
                                            } else {
                                                updatedPosts.splice(index, 1);
                                            }
                                            setPosts(updatedPosts);
                                        }}
                                        key={post.id}
                                    />
                                );
                            })}
                        </div>
                    ) : (
                        <h2>no posts available</h2>
                    )}
                </>
            ) : (
                <>
                    <div className="w-1/2 m-auto">
                        <h2>You are not Logged In</h2>
                        <div className="flex items-center">
                            <div className="btn m-2">
                                <Link
                                    href="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="btn m-2">
                                <Link
                                    href="/#"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    public Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
