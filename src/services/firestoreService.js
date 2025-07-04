// src/services/firestoreService.js
import { db } from "../firebaseConfig";
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Salva as transações organizadas por mês no Firestore:
 * /usuarios/{uid}/transacoes/{YYYY-MM}
 */
export async function salvarTransacoes(uid, transactions) {
  const transacoesPorMes = {};

  // Agrupar transações por mês
  transactions.forEach((t) => {
    const mes = t.date?.slice(0, 7); // Exemplo: "2025-07"
    if (!transacoesPorMes[mes]) {
      transacoesPorMes[mes] = [];
    }
    transacoesPorMes[mes].push(t);
  });

  // Salvar cada grupo de mês
  for (const mes in transacoesPorMes) {
    const docRef = doc(db, "usuarios", uid, "transacoes", mes);
    await setDoc(docRef, { lista: transacoesPorMes[mes] });
  }
}

/**
 * Carrega as transações de um mês específico do Firestore.
 * Retorna um array vazio caso não exista.
 */
export async function carregarTransacoes(uid, mes) {
  const docRef = doc(db, "usuarios", uid, "transacoes", mes); // mes = "2025-07"
  const snap = await getDoc(docRef);
  if (snap.exists()) {
    return snap.data().lista || [];
  }
  return [];
}
