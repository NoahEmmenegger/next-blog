export function updateProtected(db, userId, newObj) {
    console.log("ja");
    return new Promise((res, rej) => {
        db.collection("users")
            .doc(userId)
            .collection("protected")
            .doc("protected")
            .set(newObj)
            .then(() => res(true));
    });
}

export async function getProtected(db, userId) {
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

export function updateSecret(db, userId, code) {
    return new Promise((res, rej) => {
        db.collection("users")
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

export async function getSecrets(db, userId) {
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
