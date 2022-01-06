import { firestore } from "./firebase/clientApp";

export function updateUser(userId, user) {
    return new Promise((res, rej) => {
        firestore
            .collection("users")
            .doc(userId)
            .set({
                phone: user.phone || "",
                totpToken: user.totpToken || "",
                username: user.username || "",
                isAdmin: user.isAdmin || false,
            })
            .then(() => res(true));
    });
}

export async function getUserById(userId) {
    const user = await (
        await firestore.collection("users").doc(userId).get()
    ).data();

    if (!user) {
        return {
            phone: "",
            totpToken: "",
            username: "",
            isAdmin: false,
        };
    }

    return user;
}
