import { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, jobApplicationData } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

interface JwtPayload {
  sub: string;
  fullName: string;
  email: string;
  role: 'manager' | 'candidate';
  exp: number;
}

interface AuthContextProps {
  user: JwtPayload | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  dashboard: () => Promise<void>;
  signUpJobApplication: (data: jobApplicationData) => Promise<void>;
  resetPassword: (id: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp > now) {
          setUser(decoded);
        } else {
          Cookies.remove('token');
        }
      } catch {
        Cookies.remove('token');
      }
    }
    setIsLoading(false);
  }, []);

  async function signIn(email: string, password: string) {

    setIsLoading(true);

    try {
      const token = await AuthService.signIn({ email, password });
      const decoded = jwtDecode<JwtPayload>(token.token);
      setUser(decoded);
  
      Cookies.set('token', token.token, {
        expires: 7, // dias
        sameSite: 'strict',
        secure: true,
      });
  
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao tentar logar';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    } 
  }

  async function signUp(fullName: string, email: string, password: string) {
    setIsLoading(true);

    try {
      const res = await AuthService.signUp({ fullName, email, password });
      navigate('/signin', { replace: true });
      return res;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao cadastrar usuário.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUpJobApplication(data: jobApplicationData) {
    setIsLoading(true);

    try {
      const res = await AuthService.jobApplication(data);
      navigate('/email-verification', { replace: true });
      return res;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao cadastrar usuário.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function dashboard() {
    setIsLoading(true);

    try {
      const res = await AuthService.dashboard();
      return res;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao acessar o dashboard.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(id: string, newPassword: string) {
    setIsLoading(true);

    try {
      const res = await AuthService.resetPassword({ id, newPassword });
      navigate('/signin', { replace: true });
      return res;
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Erro ao redefinir senha.';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    setUser(null);
    Cookies.remove('token');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, signIn, signUp, logout, signUpJobApplication, resetPassword, dashboard }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
