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

    const signUp = ({ email, pass, phone, username }) => {
        setIsModalOpen(true);
        return;
        auth.signup(email, pass, phone, username)
            .then((user) => {
                router.push("/dashboard");
            })
            .catch((error) => {
                console.log(error);
                setError(error.message);
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
                    className="my-10 border-2"
                />
                <input
                    type="button"
                    value="Account endgültig erstellen"
                    className="btn"
                    onClick={(event) => {
                        console.log(event);
                    }}
                />
            </Modal>
            <Auth onclick={signUp} isRegister error={error} />
        </>
    );
}
