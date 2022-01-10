import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";
import { updateSecret } from "../../../utils/userProtected";
import admin from "../../../utils/firebase/nodeApp";

export default async function handler(req, res) {
    const { phone, userId } = req.body;

    const db = admin.firestore();

    // validate phone number

    const code = generateConfirmationCode(5);

    const result = await sendConfirmationSms(phone, code);

    //console.log(result);
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
