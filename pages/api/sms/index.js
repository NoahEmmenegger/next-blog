import {
    generateConfirmationCode,
    sendConfirmationSms,
} from "../../../utils/sms";

export let protectedCodes = { "+41797913470": 1234 };

export default async function handler(req, res) {
    const { phone } = req.body;
    // validate phone number

    const code = generateConfirmationCode(6);

    console.log(code);
    protectedCodes[phone] = code;

    const result = await sendConfirmationSms("41797913470", code);
    if (result.status !== 204) {
        res.status(result.status).json({
            message: "This phone number is not whitelisted!",
        });
    } else {
        res.status(200).json({
            message: 200,
        });
    }
}
