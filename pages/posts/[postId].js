import { getPostById } from "../../utils/post";
import Custom404 from "../404";

export default function Post({ post }) {
  if (!post) {
    return <Custom404 />;
  }

  return (
    <div className="object-center mx-56">
      <p className="text-6xl text-center mb-16">{post.title}</p>
      <p>{post.description}</p>
      <div>
        <form className="card m-10 p-5">
          <p>Your Comment:</p>
          <textarea
            id="w3review"
            name="w3review"
            rows="5"
            className="resize-none mt-5 px-3 py-2 border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
          ></textarea>
          <input
            type="submit"
            value="Submit"
            className="btn w-1/4 m-auto mr-0 mt-5"
          ></input>
        </form>
        {post.comments
          ? post.comments.map((comment, index) => {
              return (
                <div className="card m-10 p-5" key={index}>
                  <p className="font-bold">{comment.userId}</p>
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
  console.log(post);
  return {
    props: {
      post,
    },
  };
}
