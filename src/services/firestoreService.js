// services/firestoreService.js
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Salvar transações do mês
export async function salvarTransacoes(uid, transactions) {
  const transacoesPorMes = {};

  // Agrupar por mês
  transactions.forEach((t) => {
    const mes = t.date?.slice(0, 7); // YYYY-MM
    if (!transacoesPorMes[mes]) transacoesPorMes[mes] = [];
    transacoesPorMes[mes].push(t);
  });

  for (const mes in transacoesPorMes) {
    const docRef = doc(db, "usuarios", uid, "transacoes", mes);
    await setDoc(docRef, { lista: transacoesPorMes[mes] });
  }
}

// Carregar transações de um mês
export async function carregarTransacoes(uid, mes) {
  const docRef = doc(db, "usuarios", uid, "transacoes", mes);
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data().lista || [];
  }
  return [];
}
