import { firestore } from "./firebase";

const createPost = async (ownerId, title, description, status) => {
  firestore.collection("posts").doc().set({
    ownerId,
    title,
    description,
    status
  });
};

const getPosts = async () => {
  const snapshot = await firestore.collection("posts").get();
  return snapshot.docs.map((doc) => {
    return doc.data();
  });
};

export { getPosts, createPost };
