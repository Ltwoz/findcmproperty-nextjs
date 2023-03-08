import { Html, Head, Main, NextScript } from "next/document";
import MessengerCustomerChat from "react-messenger-customer-chat";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <MessengerCustomerChat
                    pageId="219615218531098"
                    appId="729744355296187"
                />
                <Main />
                <div id="portal" />
                <NextScript />
            </body>
        </Html>
    );
}
