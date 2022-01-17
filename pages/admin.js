import { useState, useEffect } from "react";
import { getPosts } from "../utils/post";
import { useAuth } from "../utils/auth";
import Link from "next/link";
import AdminPost from "../components/Admin/AdminPost";

export default function Admin() {
    const [posts, setPosts] = useState([]);
    const auth = useAuth();

    useEffect(() => {
        const posts = async () => {
            setPosts(await getPosts());
        };

        posts();
    }, []);
    return (
        <div className="w-1/2 m-auto">
            <h1>Admin Dashboard</h1>
            {auth?.additionalInformations?.isAdmin &&
            auth?.isFullyAuthenticated ? (
                <div className="m-auto flex flex-col items-center">
                    {posts.map((post, index) => {
                        return (
                            <div key={index} className="w-full">
                                <AdminPost
                                    key={post.id}
                                    post={post}
                                    status={post.status}
                                    onUpdatePost={(updatedPost) => {
                                        const updatedPosts = [...posts];
                                        if (updatedPost) {
                                            updatedPosts[index] = updatedPost;
                                        } else {
                                            updatedPosts.splice(index, 1);
                                        }
                                        setPosts(updatedPosts);
                                    }}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <>
                    <h2>You are not an admin</h2>
                    <div className="flex items-center">
                        <div className="btn">
                            <Link
                                href="/dashboard"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                return to Dashboard
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
