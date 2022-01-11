import { getSecrets, updateProtected } from "../../../utils/userProtected";
import admin from "../../../utils/firebase/nodeApp";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    const db = admin.firestore();

    const secretObj = await getSecrets(db, userId);

    const isFromLastFiveMinutes = (secretObj.sms.timestamp._seconds + 300) > (Date.now() / 1000)

    if (secretObj.sms.code == providedCode && isFromLastFiveMinutes) {
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
