import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child, update, remove } from "firebase/database"

const firebaseConfig = {
    databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Get a list of cities from your database
export async function getData() {
    const dbRef = ref(db);
    return get(child(dbRef, `/songs`)).then((snapshot) => {
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
    return get(child(dbRef, `/songs/${id}`)).then((snapshot) => {
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

export async function updateData(resource, data) {
    const updates = {};
    updates[`${resource}`] = data;
    update(ref(db), updates);
}

export async function removeData(resource) {
    remove(ref(db, `${resource}`)).then(() => {
        console.log('removed')
    }).catch(() => {
        console.error('err')
    });
}