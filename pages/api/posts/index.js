import { firestore } from "../../../utils/firebase/clientApp";

const getPublicPosts = async () => {
    const snapshot = await firestore
        .collection("posts")
        .where("status", "==", "public")
        .get();
    return snapshot.docs.map((doc) => {
        let post = doc.data();
        const jsonPost = JSON.stringify(post)
        return jsonPost;
    });
};

export default getPublicPosts