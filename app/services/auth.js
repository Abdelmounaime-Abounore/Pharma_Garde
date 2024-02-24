import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithCustomToken } from "firebase/auth";

export const signup = async (email, password) => {
    const auth = getAuth();
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // console.log('User created:', userCredential.user);
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error so it can be caught by the caller if necessary
    }
}

// login 
export const login = async (email, password) => {
    const auth = getAuth();
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User  in:', userCredential.user);
        console.log('====================================');
        console.log('User logged in:', userCredential);
        console.log('====================================');
        const user = userCredential.user;
        return user;
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error so it can be caught by the caller if necessary
    }
}

// logout
export const logout = async () => {
    const auth = getAuth();
    try {
        await auth.signOut();
    } catch (error) {
        console.log(error);
        throw error; // Re-throw the error so it can be caught by the caller if necessary
    }
}

// get current user
export const getCurrentUser = () => {
    const auth = getAuth();
    return auth.currentUser;
}

// validate user token

export const validateToken = async (token) => {
    const auth = getAuth();
    try {
        // Sign in with the custom token
        const userCredential = await signInWithCustomToken(auth, token);
        console.log('helooooooo:', userCredential.user);
        const user = userCredential.user;
        return user;
    } catch (error) {
        throw error;
    }
}
