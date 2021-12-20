import { useAuth } from "../utils/auth";
import { useRouter } from "next/router";
import Auth from "../components/Auth";
import { useState } from "react";

export default function Home() {
    const auth = useAuth();
    const router = useRouter();

    const [error, setError] = useState(null);

    const signUp = ({ email, pass, phone, username }) => {
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
            <Auth onclick={signUp} isRegister error={error} />
        </>
    );
}
