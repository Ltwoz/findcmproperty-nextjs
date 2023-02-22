import { ToastContextProvider } from "@/components/contexts/toast-context";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
    const { session } = pageProps;

    return (
        <SessionProvider session={session}>
            <ToastContextProvider>
                <Component {...pageProps} />
            </ToastContextProvider>
        </SessionProvider>
    );
}
