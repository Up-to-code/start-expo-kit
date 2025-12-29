import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const authClient = createAuthClient({
    baseURL: process.env.EXPO_PUBLIC_AUTH_URL || "http://localhost:3000", // Base URL of your Better Auth backend (Next.js start-kit).
    plugins: [
        expoClient({
            scheme: "startexpokit", // Your app scheme from app.json
            storagePrefix: "startexpokit",
            storage: SecureStore,
        })
    ]
});

