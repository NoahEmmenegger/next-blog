import admin from "../../../utils/firebase/nodeApp";
import { getUserById } from "../../../utils/user";


export default async function handler(req, res) {
    const { userId } = req.query;

    const db = admin.firestore();

    const user = await getUserById(db, userId)

    res.status(200).json({
        username: user.username,
    });
}