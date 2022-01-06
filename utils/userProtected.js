import admin from "./firebase/nodeApp";

const db = admin.firestore()

export function updateProtected(userId, newObj) {
    return new Promise((res, rej) => {
        db
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("protected")
            .set(newObj)
            .then(() => res(true));
    });
}

export async function getProtected(userId) {
    const user = await (
        await db
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("protected")
            .get()
    ).data();

    return user;
}

export function updateSecret(userId, code) {
    return new Promise((res, rej) => {
        db
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("secrets")
            .set({
                sms: {
                    code: code,
                    timestamp: new Date(),
                },
            })
            .then(() => res(true));
    });
}

export async function getSecrets(userId) {
    const user = await (
        await db
            .collection("users")
            .doc(userId)
            .collection("protected")
            .doc("secrets")
            .get()
    ).data();

    if (!user) {
        return {
            smsCode: "",
        };
    }

    return user;
}
