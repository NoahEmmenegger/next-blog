import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import Auth from "../components/Auth";
import Modal from "../components/Modal";
import { useEffect, useState } from "react";

export default function Home() {
    const auth = useAuth();
    const router = useRouter();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState("");
    const [error, setError] = useState("")
    const [verifyError, setVerifError] = useState("");
    const [userId, setUserId] = useState("");
    const [userObj, setUserObj] = useState({});
    const [hasSent, setHasSent] = useState(false);

    const signIn = ({ email, password }) => {
        setUserObj({ email, password });
        auth.signin(email, password)
            .then(async () => {
                setIsModalOpen(true);
            })
            .catch((error) => {
                setError(error.message)
                console.log(error);
            });
    };

    useEffect(() => {
        if (auth.additionalInformations && isModalOpen && !hasSent) {
            console.log("sendsms");
            sendSms();
            setHasSent(true);
        }
    }, [auth.additionalInformations, isModalOpen]);

    const sendSms = () => {
        setUserId(auth.userId);
        fetch("/api/sms", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone: auth.additionalInformations.phone,
                userId: auth.user.uid,
            }),
        })
            .then(async () => {
                await auth.signout();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const verify = () => {
        fetch("/api/sms/verify", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                providedCode: code,
            }),
        })
            .then(async (result) => {
                if (result.status == 200) {
                    setVerifError("");
                    await auth.signin(userObj.email, userObj.password);
                    auth.setIsFullyAuthenticated(true);
                    router.push("/dashboard");
                } else {
                    setVerifError("Does not match");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setHasSent(false);
                }}
            >
                <h1>Verify your phone number</h1>
                <p>Wir haben Ihnen ein SMS auf die vorherige Email gesendet.</p>
                <p>
                    Bitte geben Sie den erhaltenen Code im unten stehenden Feld
                    ein:
                </p>
                <input
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                    className="my-10 border-2"
                />
                <p className="text-red-600">{verifyError}</p>
                <input
                    type="button"
                    value="Login"
                    className="btn"
                    onClick={verify}
                />
            </Modal>
            <Auth onclick={signIn} error={error} />
        </>
    );
}
