// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// ✅ Primeiro: inicializa o app
const firebaseConfig = {
  apiKey: "AIzaSyBZbv7KLy4pkt2Bp7p7gUqA44E-u7gwzVc",
  authDomain: "financas-pessoais-44698.firebaseapp.com",
  projectId: "financas-pessoais-44698",
  storageBucket: "financas-pessoais-44698.firebasestorage.app",
  messagingSenderId: "193102948799",
  appId: "1:193102948799:web:23c8e640e7e906737e590a"
};

const app = initializeApp(firebaseConfig);

// ✅ Depois: usa o app para pegar os serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
