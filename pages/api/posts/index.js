import { firestore } from "../../../utils/firebase/clientApp";

const getPublicPosts = async (req, res) => {
    // todo: muss noch geschützt werden mit API TOKEN

    const snapshot = await firestore
        .collection("posts")
        .where("status", "==", "public")
        .get();
    const posts = snapshot.docs.map((doc) => {
        return doc.data();
    });

    res.status(200).json({
        posts
    });
};

export default getPublicPosts