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
    return doc.data();
  });
};

export { getPosts, createPost };
