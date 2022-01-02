import { firebase, firestore } from "../../../utils/firebase";
import { getSecrets, updateProtected } from "../../../utils/userProtected";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    await firebase
        .auth()
        .signInWithEmailAndPassword("backend@gmail.com", "backend");

    const secretObj = await getSecrets(userId);

    if (secretObj.sms.code == providedCode) {
        updateProtected(userId, { smsAuth: new Date() });
        res.status(200).json({
            message: 200,
        });
        return;
    }

    res.status(301).json({
        message: "does not match",
    });
}
