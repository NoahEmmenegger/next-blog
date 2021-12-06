import { firestore } from "./firebase";

const createPost = async (ownerUid, title, description) => {
  console.log(ownerUid);
  firestore.collection("posts").doc().set({
    ownerUid,
    title: title,
    description: description,
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

  console.log(post);

  return post;
};

export { getPosts, createPost, getPostById };
