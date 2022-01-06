import { getSecrets, updateProtected } from "../../../utils/userProtected";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    const secretObj = await getSecrets(userId);

    if (secretObj.sms.code == providedCode) {
        await updateProtected(userId, { smsAuth: true });
        res.status(200).json({
            message: 200,
        });
        return;
    }

    res.status(301).json({
        message: "does not match",
    });
}
