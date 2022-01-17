import axios from "axios";
import { firestore, firebase } from "./firebase/clientApp";

const createPost = async (ownerId, title, description, status) => {
    let document = firestore.collection("posts").doc();

    await document.set({
        ownerId,
        title,
        description,
        status,
        createDate: firebase.firestore.Timestamp.fromDate(new Date()),
    });

    const date = new Date()
     fetch("/api/logs", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: 'createPostLogs.txt',
                data: `${ownerId} / ${date} / ${title} \n`,
            }),
        })

    //return await getPostById(document.id);
};

const getPosts = async () => {
    const snapshot = await firestore
        .collection("posts")
        .orderBy("createDate", "desc")
        .get()
        .catch(() => {
            return { docs: [] };
        });
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
    const post = await (
        await firestore.collection("posts").doc(postId).get()
    ).data();

    if (!post) {
        return null;
    }

    post.createDate = post.createDate.seconds;
    post.comments = await getPostComments(postId);
    post.id = postId;

    console.log(post.comments);

    return post;
};

const getPostComments = async (postId) => {
    const snapshot = await firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .get();
    const maping = snapshot.docs.map(async (doc) => {
        let comment = doc.data();
        comment.userName = (
            await axios.get(
                `http://localhost:3000/api/user?userId=${comment.userId}`
            )
        ).data.username;
        comment.id = doc.id;
        return comment;
    });

    return await Promise.all(maping);
};

const createComment = async (
    postId,
    content = "Test Kommentar",
    userId = "4U3jCONstTdwxrWROAHbYqLRTUd2"
) => {
    console.log(postId);
    console.log("Test 1");
    let document = firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc();

    console.log("Test log");

    await document.set({
        content: content,
        userId: userId,
    });

    const date = new Date()
     fetch("/api/logs", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: 'createPostCommentLogs.txt',
                data: `${postId} / ${userId} / ${date} / ${content} \n`,
            }),
        })
};

const removePostById = async (postId) => {
        const date = new Date()
        fetch("/api/logs", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: 'deletePost.txt',
                    data: `${postId} / ${date} \n`,
                }),
            })

    return await firestore
        .collection("posts")
        .doc(postId)
        .update({ status: "deleted" });
};

const updatePost = async (post) => {
        const date = new Date()
        fetch("/api/logs", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName: 'updatePostLogs.txt',
                    data: `${post.id} / ${date} \n`,
                }),
            })

    return new Promise((res, rej) => {
        firestore
            .collection("posts")
            .doc(post.id)
            .set(post)
            .then(() => res(true));
    });
};

export {
    getPosts,
    createPost,
    getPostById,
    getUserPostsById,
    getPublicPosts,
    removePostById,
    updatePost,
    createComment,
};
