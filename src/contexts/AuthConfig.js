import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase';

const AuthContext = React.createContext();

/* custom hook */
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    /* creating the user (signup) */
    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    /* login */
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    /* logout */
    const logout = () => {
        return auth.signOut();
    }

    /* update credentials */
    const update1 = (email) => {
        return currentUser.updateEmail(email);
    }
    const update2 = (password) => {
        return currentUser.updatePassword(password);
    }

    /* to set the user (will be called whenever createUser....is called )*/
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        update1,
        update2
    }

    return (
        <AuthContext.Provider value = {value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
