import { firestore, firebase } from "./firebase";

const createPost = async (ownerId, title, description, status) => {
    let document = firestore.collection("posts").doc();

    await document.set({
        ownerId,
        title,
        description,
        status,
        createDate: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    return await getPostById(document.id);
};

const getPosts = async () => {
    const snapshot = await firestore
        .collection("posts")
        .orderBy("createDate", "desc")
        .get();
    return snapshot.docs.map((doc) => {
        let post = doc.data();
        post.id = doc.id;
        return post;
    });
};

const getUserPostsById = async (userId) => {
    const snapshot = await firestore
        .collection("posts")
        .where("ownerId", "==", userId)
        .get();
    return snapshot.docs.map((doc) => {
        let post = doc.data();
        post.id = doc.id;
        return post;
    });
};

const getPublicPosts = async () => {
    const snapshot = await firestore
        .collection("posts")
        .where("status", "==", "public")
        .get();
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

    post.createDate = post.createDate.seconds;

    return post;
};

const removePostById = async (postId) => {
    return await firestore.collection("posts").doc(postId).delete();
};

export {
    getPosts,
    createPost,
    getPostById,
    getUserPostsById,
    getPublicPosts,
    removePostById,
};
