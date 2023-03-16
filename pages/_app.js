import { ToastContextProvider } from "@/components/contexts/toast-context";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "@/lib/gtag";
import Script from "next/script";
import { useEffect } from "react";
import { SidebarContextProvider } from "@/components/contexts/sidebar-context";

export default function App({ Component, pageProps }) {
    const { session } = pageProps;
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <>
            <Head>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gtag.GA_TRACKING_ID}', {
                                page_path: window.location.pathname,
                            });
                        `,
                    }}
                />
            </Head>
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
            <SessionProvider session={session}>
                <ToastContextProvider>
                    <SidebarContextProvider>
                        <Component {...pageProps} />
                    </SidebarContextProvider>
                </ToastContextProvider>
            </SessionProvider>
        </>
    );
}
