import { useState } from "react";
import { useAuth } from "../utils/auth"
import Custom404 from "./404";

export default function Profile() {
    const auth = useAuth();

    if (!auth.additionalInformations) {
        return <Custom404 />
    }

    const [newUsername, setNewUsername] = useState(auth.additionalInformations.username)
    const [newPhone, setNewPhone] = useState(auth.additionalInformations.phone)

    return (
        <form className="max-w-screen-lg m-auto p-10" onSubmit={(event) => {
            event.preventDefault();
            auth.setAdditionalInformations({ ...auth.additionalInformations, username: newUsername, phone: newPhone })
            return false;
        }}>
            <div className="flex content-between">
                <h1>Your Profile</h1>
                <button type="submit" className="btn w-min ml-auto">Save</button>
            </div>
            <div>
                <div>
                    <p>Username</p>
                    <input value={newUsername} required onChange={e => setNewUsername(e.target.value)} />
                </div>
                <div>
                    <p>Phone</p>
                    <input value={newPhone}
                        type="tel"
                        pattern="^41[0-9]*$"
                        autoComplete="phone"
                        minLength="11"
                        maxLength="11"
                        required
                        onChange={e => setNewPhone(e.target.value)} />
                </div>
            </div>
        </form>
    )
}