import { useState } from "react";
import { useAuth } from "../../utils/auth";
import { getPostById } from "../../utils/post";
import { createComment } from "../../utils/post";
import Custom404 from "../404";

export default function Post({ post }) {
    const auth = useAuth();
    const [comments, setComments] = useState(post.comments);

    if (!post) {
        return <Custom404 />;
    }

    console.log(auth);

    return (
        <div className="object-center mx-56">
            <p className="text-6xl text-center mb-16">{post.title}</p>
            <p>{post.description}</p>
            <div>
                {auth.isFullyAuthenticated && (
                    <form
                        className="card m-10 p-5"
                        onSubmit={(event) => {
                            event.preventDefault();
                            return false;
                        }}
                    >
                        <p>Your Comment:</p>
                        <textarea
                            maxLength="200"
                            id="commentContent"
                            name="commentContent"
                            rows="3"
                            className="resize-none mt-5 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                        ></textarea>
                        <input
                            type="submit"
                            value="Submit"
                            className="btn w-1/4 m-auto mr-0 mt-5"
                            onClick={() => {
                                setComments([
                                    {
                                        id: post.id,
                                        content:
                                            document.getElementById(
                                                "commentContent"
                                            ).value,
                                        userName:
                                            auth.additionalInformations
                                                .username,
                                    },
                                    ...comments,
                                ]);
                                createComment(
                                    post.id,
                                    document.getElementById("commentContent")
                                        .value,
                                    auth.userId
                                );
                                document.getElementById(
                                    "commentContent"
                                ).value = "";
                            }}
                        ></input>
                    </form>
                )}
                {comments
                    ? comments.map((comment, index) => {
                          return (
                              <div className="card m-10 p-5" key={index}>
                                  <p className="font-bold">
                                      {comment.userName}
                                  </p>
                                  <p>{comment.content}</p>
                              </div>
                          );
                      })
                    : "No Comments"}
            </div>
        </div>
    );
}

export async function getServerSideProps({ params }) {
    let post = await getPostById(params.postId);
    return {
        props: {
            post,
        },
    };
}
