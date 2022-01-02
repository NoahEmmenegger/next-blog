import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";
import { updateProtected } from "../../../utils/userProtected";

export let protectedCodes = { "+41797913470": 1234 };

export default async function handler(req, res) {
    const { phone, userId } = req.body;
    // validate phone number

    const code = generateConfirmationCode(6);

    const result = await sendConfirmationSms(phone, code);
    if (result.status !== 204) {
        res.status(result.status).json({
            message: "This phone number is not whitelisted!",
        });
    } else {
        updateProtected(userId, code);
        res.status(200).json({
            message: 200,
        });
    }
}
