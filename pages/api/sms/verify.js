import { getSecrets, updateProtected } from "../../../utils/userProtected";
import admin from "../../../utils/firebase/nodeApp";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    const db = admin.firestore();

    const secretObj = await getSecrets(db, userId);

    if (secretObj.sms.code == providedCode) {
        await updateProtected(db, userId, { smsAuth: true });
        res.status(200).json({
            message: 200,
        });
        return;
    }

    res.status(301).json({
        message: "does not match",
    });
}
