import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User, getIdToken } from 'firebase/auth';
import { ref, get } from 'firebase/database';
import { auth, database, DEMO_MODE } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      // In demo mode, auto-login as admin
      setIsAdmin(true);
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const adminSnap = await get(ref(database, `admins/${firebaseUser.uid}`));
          if (adminSnap.exists() && adminSnap.val().active === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
            await signOut(auth);
          }
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async (email: string, password: string) => {
    if (DEMO_MODE) {
      setIsAdmin(true);
      return;
    }
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const adminSnap = await get(ref(database, `admins/${cred.user.uid}`));
    if (!adminSnap.exists() || adminSnap.val().active !== true) {
      await signOut(auth);
      throw new Error('Access denied. Your account is not registered as admin.');
    }
  };

  const logout = async () => {
    if (DEMO_MODE) {
      setIsAdmin(false);
      return;
    }
    await signOut(auth);
    setIsAdmin(false);
  };

  const getToken = async (): Promise<string | null> => {
    if (user) {
      return getIdToken(user);
    }
    return null;
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout, getIdToken: getToken }}>
      {children}
    </AuthContext.Provider>
  );
}
