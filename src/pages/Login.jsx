import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setMensagem("");
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

  const handleEsqueceuSenha = async () => {
    setErro("");
    setMensagem("");
    if (!email) {
      setErro("Por favor, preencha o e-mail para recuperar a senha.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMensagem("Enviamos um link de recuperação para seu e-mail.");
    } catch (err) {
      console.error(err);
      setErro("Erro ao enviar e-mail de recuperação.");
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

          {mensagem && (
            <div className="text-green-500 bg-green-100 p-2 rounded mb-4 text-sm">
              {mensagem}
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

          {isLogin && (
            <button
              onClick={handleEsqueceuSenha}
              className="w-full text-sm text-blue-600 hover:underline mt-3"
            >
              Esqueceu a senha?
            </button>
          )}

          <p className="text-sm text-center mt-4">
            {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={() => {
                setIsLogin(!isLogin);
                setErro("");
                setMensagem("");
              }}
            >
              {isLogin ? "Cadastre-se" : "Fazer login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
