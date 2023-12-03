import { initializeApp, getAuth, signInWithEmailAndPassword } from 'firebase/app';
import { getDatabase, ref, get, child, set } from "firebase/database"

const firebaseConfig = {
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
    set(child(dbRef, `/songs1/${songId}`), data)
}

export function signIn(email, password) {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
}