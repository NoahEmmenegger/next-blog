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
    const [error, setError] = useState("");
    const [smsError, setSmsError] = useState("");
    const [verifyError, setVerifError] = useState("");
    const [userId, setUserId] = useState("");
    const [userObj, setUserObj] = useState({});
    const [hasSent, setHasSent] = useState(false);

    console.log(auth.additionalInformations);

    const signIn = ({ email, password }) => {
        setUserObj({ email, password });
        auth.signin(email, password)
            .then(async () => {
                setIsModalOpen(true);
            })
            .catch((error) => {
                setError(error.message);
                console.log(error);
            });
    };

    useEffect(() => {
        if (auth.additionalInformations && isModalOpen && !hasSent) {
            setUserId(auth.userId);
            auth.signout();

            console.log("sendsms");
            sendSms();
            setHasSent(true);
        }
    }, [auth.additionalInformations, isModalOpen]);

    const sendSms = () => {
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
            .then(async (result) => {
                console.log(result);
                if (result.status !== 200) {
                    setSmsError(
                        "We couldn't send you a text message. There is probably no SMS for this account or the SMS is not in the expected format. Please contact an administrator."
                    );
                }
            })
            .catch((error) => {
                console.log("ja");
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
                    setVerifError("Does not match or has expired.");
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
                {!smsError ? (
                    <>
                        <h1>Verify your phone number</h1>
                        <p>
                            We have sent you a message on the reigstrated
                            number.
                        </p>
                        <p>Please Enter your 5-digit code below:</p>
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
                    </>
                ) : (
                    <div className="text-red-600">{smsError}</div>
                )}
            </Modal>
            <Auth onclick={signIn} error={error} />
        </>
    );
}
