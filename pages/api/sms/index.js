import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";
import { firebase } from "../../../utils/firebase";
import { updateSecret } from "../../../utils/userProtected";

export default async function handler(req, res) {
    const { phone, userId } = req.body;
    console.log(phone, userId);
    // validate phone number

    await firebase
        .auth()
        .signInWithEmailAndPassword("backend@gmail.com", "backend");

    const code = generateConfirmationCode(1);

    const result = await sendConfirmationSms(phone, code);
    if (result.status !== 204) {
        res.status(result.status).json({
            message: "This phone number is not whitelisted!",
        });
    } else {
        await updateSecret(userId, code);
        res.status(200).json({
            message: 200,
        });
    }
}
