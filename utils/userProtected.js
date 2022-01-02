import { firestore } from "./firebase";

export function updateSecret(userId, code) {
    console.log("joo");
    return new Promise((res, rej) => {
        firestore
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
        await firestore
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
