import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { User } from "qualityapi/authentication";

import axios from "axios";

import ParentProps from "@/types/common/ParentProps";
import ContextProviderError from "@/errors/ContextProviderError";

type SessionContextValue = {
    status: "authenticated";
    user: User;
} | {
    status: "loading" | "unauthenticated";
    user: null;
};

export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionContextProvider({ children }: Readonly<ParentProps>) {
    const [status, setStatus] = useState<"authenticated" | "loading" | "unauthenticated">("loading");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        axios.get<User>("/api/auth/session")
            .then(response => {
                setStatus("authenticated");
                setUser(response.data);
            })
            .catch(() => {
                setStatus("unauthenticated");
            });
    }, []);

    const value = useMemo(() => ({
        status,
        user
    } as SessionContextValue), [status, user]);

    return createElement(SessionContext.Provider, { value }, children);
}

function useSession() {
    const context = useContext(SessionContext);

    if (!context) throw new ContextProviderError();

    return context;
}

export default useSession;