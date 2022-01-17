import { firestore } from "../../../utils/firebase/clientApp";

const getPublicPosts = async (req, res) => {
    if (req.method !== "GET") {
        console.log("test0");
        return res.status(405).json({ message: "Wrong Method" });
    }

    if (req.query.token !== process.env.API_Token) {
        console.log("test1");
        return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("test2");
    const snapshot = await firestore
        .collection("posts")
        .where("status", "==", "public")
        .get();
    const posts = snapshot.docs.map((doc) => {
        return doc.data();
    });

    res.status(200).json({
        posts,
    });
};

export default getPublicPosts;
