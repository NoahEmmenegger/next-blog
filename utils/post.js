import { firestore } from "./firebase";

const createPost = async (ownerId, title, description, status) => {
  firestore.collection("posts").doc().set({
    ownerId,
    title,
    description,
    status,
  });
};

const getPosts = async () => {
  const snapshot = await firestore.collection("posts").get();
  return snapshot.docs.map((doc) => {
    let post = doc.data();
    post.id = doc.id;
    return post;
  });
};

const getPostById = async (postId) => {
  console.log(postId);
  const post = await (
    await firestore.collection("posts").doc(postId).get()
  ).data();

  if (!post) {
    return null;
  }

  return post;
};

export { getPosts, createPost, getPostById };
