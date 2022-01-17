import React, { useState, useEffect, useContext, createContext } from "react";
import "firebase/auth";

import { firebase, firestore } from "./firebase/clientApp";
import { getUserById, updateUser } from "./user";
import { useRouter } from "next/router";
import { getProtected } from "./userProtected";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const [additionalInformations, setAdditionalInformations] = useState(null);
    const [isFullyAuthenticated, setIsFullyAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (additionalInformations) {
            updateUser(user.uid, additionalInformations);
        }
    }, [additionalInformations]);

    useEffect(() => {
        async function init() {
            if (user) {
                setAdditionalInformations(
                    await getUserById(firestore, user.uid)
                );
            }
            if (user && user.uid) {
                //setIsFullyAuthenticated(true);
                setIsFullyAuthenticated(
                    (await getProtected(firestore, user.uid))?.smsAuth || true
                );
            }
        }

        init();
    }, [user]);

    const signin = async (email, password) => {
        const response = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        setUser(response.user);

        const date = new Date();
        fetch("/api/logs", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: "signInLogs.txt",
                data: `${email} / ${date} \n`,
            }),
        });

        return response.user;
    };

    const signinWithProvider = () => {
        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((response) => {
                setUser(response.user);
                setAdditionalInformations({
                    username: response.user.displayName,
                });
                const date = new Date();
                fetch("/api/logs", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileName: "signInWithProviderLogs.txt",
                        data: `${response.user.displayName} / ${date} \n`,
                    }),
                });
                return response.user;
            });
    };

    const signup = ({ email, password, phone, username, code }) => {
        return firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                setUser(response.user);
                setAdditionalInformations({ phone, username });

                const date = new Date();
                fetch("/api/logs", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fileName: "signUpLogs.txt",
                        data: `${email} / ${date} \n`,
                    }),
                });

                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(async () => {
                setUser(false);
                setAdditionalInformations(null);
                setIsFullyAuthenticated(false);
                router.push("/login");
            });
    };

    const sendPasswordResetEmail = (email) => {
        return firebase
            .auth()
            .sendPasswordResetEmail(email)
            .then(() => {
                return true;
            });
    };

    const confirmPasswordReset = (password, code) => {
        const resetCode = code || getFromQueryString("oobCode");

        return firebase
            .auth()
            .confirmPasswordReset(resetCode, password)
            .then(() => {
                return true;
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return {
        userId: user && user.uid,
        user: user,
        additionalInformations,
        isFullyAuthenticated,
        setIsFullyAuthenticated,
        setAdditionalInformations,
        signin,
        signinWithProvider,
        signup,
        signout,
        sendPasswordResetEmail,
        confirmPasswordReset,
    };
}

const getFromQueryString = (key) => {
    return queryString.parse(window.location.search)[key];
};
