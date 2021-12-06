import { getPostById } from "../../utils/post";
import Custom404 from "../404";

export default function Post({ post }) {
  if (!post) {
    return <Custom404 />;
  }

  return (
    <div>
      <p>{post.title}</p>
      <p>{post.description}</p>
      <div>
        {post.comments.map((comment, index) => {
          return <div key={index}>{comment.content}</div>;
        })}
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
