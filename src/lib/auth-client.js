import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    // In browser, automatically use current window.location.origin
    baseURL: typeof window !== "undefined" ? window.location.origin : (process.env.BETTER_AUTH_URL || "http://localhost:3000"),
    plugins: [
        jwtClient()
    ]
});

export const { signIn, signUp, signOut, useSession } = authClient;