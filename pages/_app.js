import { ToastContextProvider } from "@/components/contexts/toast-context";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function App({ Component, pageProps }) {
    const { session } = pageProps;

    return (
        <SessionProvider session={session}>
            <ToastContextProvider>
                <Component {...pageProps} />
                <MessengerCustomerChat
                    pageId="219615218531098"
                    appId="935203817615198"
                />
            </ToastContextProvider>
        </SessionProvider>
    );
}
