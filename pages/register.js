import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import Auth from "../components/Auth";
import { useState } from "react";
import Modal from "../components/Modal";

export default function Home() {
    const auth = useAuth();
    const router = useRouter();

    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userObject, setUserObject] = useState({});

    const signUp = (user) => {
        setIsModalOpen(true);
        setUserObject(user);
        fetch("/api/sms", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ phone: user.phone }),
        })
            .then(console.log)
            .catch((error) => {
                console.log(error);
            });
        return;
    };

    const verify = () => {
        auth.signup(userObject)
            .then((user) => {
                router.push("/dashboard");
            })
            .catch((error) => {
                setError(error.message);
                setIsModalOpen(false);
            });
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h1>Verify your phone number</h1>
                <p>Wir haben Ihnen ein SMS auf die vorherige Email gesendet.</p>
                <p>
                    Bitte geben Sie den erhaltenen Code im unten stehenden Feld
                    ein:
                </p>
                <input
                    type="text"
                    placeholder="Code"
                    value={userObject.code}
                    onChange={(e) => {
                        setUserObject({ ...userObject, code: e.target.value });
                    }}
                    className="my-10 border-2"
                />
                <input
                    type="button"
                    value="Account endgültig erstellen"
                    className="btn"
                    onClick={verify}
                />
            </Modal>
            <Auth onclick={signUp} isRegister error={error} />
        </>
    );
}
