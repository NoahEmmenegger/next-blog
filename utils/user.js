import { firestore } from "./firebase";

export function updateUser(user) {
    return new Promise((res, rej) => {
        firestore
            .collection("users")
            .doc(user.uid)
            .set({
                phone: user.phone | "",
                totpToken: user.totpToken | "",
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
