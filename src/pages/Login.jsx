import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, senha);
      } else {
        await createUserWithEmailAndPassword(auth, email, senha);
      }
      navigate("/");
    } catch (err) {
      setErro("Erro ao autenticar. Verifique e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8">
        {/* 📸 Imagem ilustrativa */}
        <div className="hidden md:flex w-1/2 items-center justify-center">
          <img
            src="/images/login-illustration.png"
            alt="Gráfico ilustrativo"
            className="max-w-full h-auto"
          />
        </div>

        {/* 🧾 Formulário */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isLogin ? "Bem-vindo de volta!" : "Crie sua conta"}
          </h2>

          <p className="text-gray-600 text-center mb-6">
            Gerencie suas finanças pessoais com facilidade
          </p>

          {erro && (
            <div className="text-red-500 bg-red-100 p-2 rounded mb-4 text-sm">
              {erro}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Cadastre-se" : "Fazer login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
