import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

import {initializeApp} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyCZin5wuG-ITPbMOwsqiVHErUgKgFn-1rc",
  authDomain: "insta-native-app-32031.firebaseapp.com",
  projectId: "insta-native-app-32031",
  storageBucket: "insta-native-app-32031.appspot.com",
  messagingSenderId: "795098089366",
  appId: "1:795098089366:web:c4e71b7cd8b8930b8cffb7"
};

const app = initializeApp(firebaseConfig)

export default app
export const auth = getAuth(app);
export const db = getFirestore(app)




