import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { RecordAuthResponse, Record } from "pocketbase";

import { Credentials } from "lib/types";
import { useRouter } from "next/router";

interface AuthContextValue {
  register: (credentials: Credentials) => Promise<unknown>;
  logout: () => Promise<void>;
  login: (
    credentials: Omit<Credentials, "passwordConfirm">,
  ) => Promise<unknown>;
  token: string | null;
  user: Record | null;
}

const AuthContext = createContext<AuthContextValue>({
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  login: () => Promise.resolve(),
  token: null,
  user: null,
});

export function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<Record | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/auth/session", {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((res: RecordAuthResponse<Record>) => {
        setToken(res.token);
        setUser(res.record);
      })
      .catch((error) => {
        console.error(error);
        setToken(null);
        setUser(null);
      });

    const it = setInterval(() => {
      fetch("/api/auth/session", {
        signal: controller.signal,
      })
        .then((res) => res.json())
        .then((res: RecordAuthResponse<Record>) => {
          setToken(res.token);
          setUser(res.record);
        })
        .catch((error) => {
          console.error(error);
          setToken(null);
          setUser(null);
        });
    }, 1000 * 60);

    return () => {
      clearInterval(it);
      controller.abort();
    };
  }, []);

  const register = useCallback(
    async (credentials: Credentials) => {
      try {
        const authData: RecordAuthResponse<Record> = await fetch(
          "/api/auth/login",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        ).then((res) => res.json());

        setToken(authData.token);
        setUser(authData.record);

        router.push("/");
      } catch (error: unknown) {
        console.error(error);
      }
    },
    [router],
  );

  const login = useCallback(
    async (credentials: Omit<Credentials, "passwordConfirm">) => {
      try {
        const authData: RecordAuthResponse<Record> = await fetch(
          "/api/auth/login",
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        ).then((res) => res.json());

        setToken(authData.token);
        setUser(authData.record);

        router.push("/");
      } catch (error: unknown) {
        console.error(error);
      }
    },
    [router],
  );

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout");
      router.push("/login");
    } catch (error: unknown) {
      console.error(error);
    }
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        register,
        logout,
        login,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
