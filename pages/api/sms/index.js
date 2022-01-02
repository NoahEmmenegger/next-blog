import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";
import { updateSecret } from "../../../utils/userProtected";

export default async function handler(req, res) {
    const { phone, userId } = req.body;
    // validate phone number

    const code = generateConfirmationCode(1);

    const result = await sendConfirmationSms(phone, code);
    if (result.status !== 204) {
        res.status(result.status).json({
            message: "This phone number is not whitelisted!",
        });
    } else {
        updateSecret(userId, code);
        res.status(200).json({
            message: 200,
        });
    }
}
