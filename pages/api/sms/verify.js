import { protectedCodes } from ".";

export default function verify(req, res) {
    const { phone, code } = req.body;
    console.log(protectedCodes[phone]);
    res.status(200).json({
        message: 200,
    });
}
