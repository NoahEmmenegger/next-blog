import { protectedCodes } from ".";
import { getSecrets } from "../../../utils/userProtected";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    const secretObj = await getSecrets(userId);
    if (secretObj.sms.code == providedCode) {
        res.status(200).json({
            message: 200,
        });
        return;
    }

    res.status(301).json({
        message: "does not match",
    });
}
