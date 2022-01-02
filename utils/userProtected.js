import { firestore } from "./firebase";

export function updateProtected(userId, code) {
    console.log("joo");
    return new Promise((res, rej) => {
        firestore
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("protected")
            .set({
                smsCode: code,
            })
            .then(() => res(true));
    });
}

export async function getProtected(userId) {
    const user = await (
        await firestore
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("protected")
            .get()
    ).data();

    if (!user) {
        return {
            smsCode: "",
        };
    }

    return user;
}
