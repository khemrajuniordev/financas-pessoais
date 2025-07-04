import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-lg shadow-md mb-4">
      <h1 className="text-lg font-semibold">Finanças Pessoais</h1>

      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100 text-sm"
      >
        Sair
      </button>
    </header>
  );
}
