import { firestore } from "./firebase";

export function updateUser(userId, user) {
    return new Promise((res, rej) => {
        firestore
            .collection("users")
            .doc(userId)
            .set({
                phone: user.phone || "",
                totpToken: user.totpToken || "",
                userName: user.username || "",
            })
            .then(() => res(true));
    });
}

export async function getUserById(userId) {
    const user = await (
        await firestore.collection("users").doc(userId).get()
    ).data();

    if (!user) {
        return null;
    }

    return user;
}
