import { createContext, createElement, useContext, useEffect, useMemo, useState } from "react";
import { Session } from "qualityapi/authentication";

import axios from "axios";

import ParentProps from "@/types/common/ParentProps";
import ContextProviderError from "@/errors/ContextProviderError";

type SessionContextValue = {
    status: "authenticated";
    session: Session;
} | {
    status: "loading" | "unauthenticated";
    session: null;
};

export const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionContextProvider({ children }: Readonly<ParentProps>) {
    const [status, setStatus] = useState<"authenticated" | "loading" | "unauthenticated">("loading");
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        axios.get<Session>("/api/auth/session")
            .then(response => {
                setStatus("authenticated");
                setSession(response.data);
            })
            .catch(() => {
                setStatus("unauthenticated");
            });
    }, []);

    const value = useMemo(() => ({
        status,
        session
    } as SessionContextValue), [status, session]);

    return createElement(SessionContext.Provider, { value }, children);
}

function useSession() {
    const context = useContext(SessionContext);

    if (!context) throw new ContextProviderError();

    return context;
}

export default useSession;