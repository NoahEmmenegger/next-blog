import { protectedCodes } from ".";
import { getProtected } from "../../../utils/userProtected";

export default async function verify(req, res) {
    const { userId, providedCode } = req.body;

    const protectedObj = await getProtected(userId);
    if (protectedObj.smsCode == providedCode) {
        res.status(200).json({
            message: 200,
        });
        return;
    }

    res.status(301).json({
        message: "does not match",
    });
}
