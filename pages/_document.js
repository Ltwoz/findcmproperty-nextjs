import { Html, Head, Main, NextScript } from "next/document";
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <MessengerCustomerChat
                    pageId="219615218531098"
                    appId="935203817615198"
                />
                <div id="portal" />
                <NextScript />
            </body>
        </Html>
    );
}
