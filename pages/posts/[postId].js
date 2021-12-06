import { getPostById } from "../../utils/post";

export default function Post({ post }) {
  console.log(post);
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
