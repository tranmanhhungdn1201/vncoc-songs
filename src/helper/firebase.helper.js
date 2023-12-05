import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, get, child, set } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAND-d_qnN3l82b0d5Wfq-x3iroSb3qva8",
    authDomain: "vncoc-songs.firebaseapp.com",
    projectId: "vncoc-songs",
    storageBucket: "vncoc-songs.appspot.com",
    messagingSenderId: "169452849467",
    appId: "1:169452849467:web:5de652edaddbe035638f1e",
    measurementId: "G-SDPPJSHCNK",
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

// Get a list of cities from your database
export async function getData() {
    const dbRef = ref(db);
    return get(child(dbRef, `/songs1`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return []
        }
    }).catch((error) => {
        console.error(error);
        return []
    });
}

export async function getItem(id) {
    const dbRef = ref(db);
    return get(child(dbRef, `/songs1/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return []
        }
    }).catch((error) => {
        console.error(error);
        return []
    });
}

export function writeLyric(songId, data) {
    const dbRef = ref(db);
    delete data.isFavorite;
    set(child(dbRef, `/songs1/${songId}`), data).then()
}

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
    // return signOut(auth);
    signOut(auth).then(() => {
        // Sign-out successful.
      }).catch((error) => {
        console.error(error)
        // An error happened.
      });
      
}

export function checkAuth() {
    return Boolean(auth.currentUser);
}