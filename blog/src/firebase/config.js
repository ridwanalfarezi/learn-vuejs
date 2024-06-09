import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAIVTqpUf7oKQvEBzDOF8WEku-uK5iHW98",
  authDomain: "vue-blog-a4c17.firebaseapp.com",
  projectId: "vue-blog-a4c17",
  storageBucket: "vue-blog-a4c17.appspot.com",
  messagingSenderId: "33747850",
  appId: "1:33747850:web:fc8d1f3b4a6ab6806a0e73",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db as projectFirestore };
