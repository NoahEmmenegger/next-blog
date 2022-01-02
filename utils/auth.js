import React, { useState, useEffect, useContext, createContext } from "react";
import "firebase/auth";

import { firebase } from "./firebase";
import { getUserById, updateUser } from "./user";
import { protectedCodes } from "../pages/api/sms";
import { getProtected, updateProtected } from "./userProtected";

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

    useEffect(() => {
        if (additionalInformations) {
            updateUser(user.uid, additionalInformations);
        }
    }, [additionalInformations]);

    useEffect(() => {
        async function init() {
            if (user) {
                setAdditionalInformations(await getUserById(user.uid));
            }
            if (user && user.uid) {
                setIsFullyAuthenticated((await getProtected(user.uid)).smsAuth);
            }
        }

        init();
    }, [user]);

    const signin = (email, password) => {
        // console.log(phone, code);
        // if (protectedCodes[phone] != code || true /* remove */) {
        //     return new Promise((req, res) =>
        //         res({ message: "Wrong phone number code" })
        //     );
        // }
        return firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                setUser(response.user);
                return response.user;
            });
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
                return response.user;
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                updateProtected(user.uid, { smsAuth: false });
                setUser(false);
                setIsFullyAuthenticated(false);
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
