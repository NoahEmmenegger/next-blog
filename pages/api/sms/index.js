import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";
import { updateSecret } from "../../../utils/userProtected";
import admin from "../../../utils/firebase/nodeApp";

export default async function handler(req, res) {
    const { phone, userId } = req.body;

    if (!phone.match(/^41[0-9]*$/gm || phone.length !== 11)) {
        return res.status(400).json({
            message:
                "Your Phone number is saved in the wrong format. Please contact the adminstrators.",
        });
    }

    const db = admin.firestore();

    const code = generateConfirmationCode(5);

    const result = await sendConfirmationSms(phone, code);

    if (result.status !== 204) {
        res.status(result.status).json({
            message: "This phone number is not whitelisted!",
        });
    } else {
        await updateSecret(db, userId, code);
        res.status(200).json({
            message: 200,
        });
    }
}
