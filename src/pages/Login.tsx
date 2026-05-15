import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ArrowRight, Lock, Mail } from "lucide-react";
import logo from "@/assets/logo.svg";

export function Login() {
  const navigate = useNavigate();

  const { login, user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (firebaseError: any) {
      console.log("Erro ao fazer login: ", firebaseError);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <main className="w-full px-4 mt-36 max-w-[350px]">
          <div className="flex items-center gap-2 justify-center mb-6">
            <img src={logo} alt="Logo" className="h-8" />
            <h1 className="text-lg font-medium text-slate-900">
              Painel de operações
            </h1>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <div>
              <label htmlFor="email" className="text-sm font-medium block">
                Seu E-mail
              </label>
              <div className="flex rounded-md py-1 px-3 bg-slate-100 border border-slate-200 text-sm gap-1.5 items-center focus-within:outline-2 shadow-sm">
                <Mail size={18} className="text-slate-400" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Digite seu e-mail"
                  className="outline-none"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="text-sm font-medium">
                Sua senha
              </label>
              <div className="flex rounded-md py-1 px-3 bg-slate-100 border border-slate-200 text-sm gap-1.5 items-center focus-within:outline-2 shadow-sm">
                <Lock size={18} className="text-slate-400" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Digite sua senha"
                  className="outline-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md text-sm py-1.5 flex gap-1.5 items-center justify-center cursor-pointer disabled:opacity-70 disabled:pointer-events-none shadow-md/30"
              disabled={!email || !password}
            >
              Entrar
              <ArrowRight size={18} />
            </button>
          </form>
        </main>
      </div>
    </>
  );
}
