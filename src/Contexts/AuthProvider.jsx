import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    // observe user
    const [user, setUser] = useState(null);
    //set loading 
    const [loading, setLoading] = useState(true);
    // creating user with email and password 
    const createUser = ({ email, password }) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };
    // login with github
    const githubProvider = new GithubAuthProvider();
    const githubLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };
    // login with facebook
    const facebookProvider = new FacebookAuthProvider();
    const facebookLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };
    // sign in user with email and password
    const signInUser = ({ email, password }) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    // log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // observe the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    });
    //all context value
    const authInfo = { user, createUser, googleLogin, githubLogin, facebookLogin, signInUser, logOut, loading };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
export default AuthProvider;