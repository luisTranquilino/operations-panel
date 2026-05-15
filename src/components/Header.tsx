import { LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import logo from "@/assets/logo.svg";

type HeaderProps = {
  userMail: string | null;
};

export function Header({ userMail }: HeaderProps) {
  const { logout } = useAuth();
  const userName = userMail ? userMail.split("@")[0] : "";

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Usuário deslogado com sucesso!");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <header className="flex justify-between px-4 py-2 border-b-1 border-slate-200 shadow-md/30">
      <div className="flex items-center gap-2 justify-center">
        <img src={logo} alt="Logo" className="h-7" />
        <h1 className="text-md font-medium text-slate-900">
          Painel de operações
        </h1>
      </div>
      <div className="flex gap-2">
        <span className="h-[28px] w-[28px] rounded-full bg-blue-900 text-white flex items-center justify-center text-sm font-medium pointer-events-none">
          {userName[0].toUpperCase()}
        </span>
        <button
          onClick={handleLogout}
          className="hover:bg-red-500/90 rounded-md px-1.5 hover:text-white cursor-pointer"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
