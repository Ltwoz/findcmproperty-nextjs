import dynamic from "next/dynamic";
import Head from "next/head";
const Navbar = dynamic(() => import("./navbar"));
const Footer = dynamic(() => import("./footer"));
import MessengerCustomerChat from "react-messenger-customer-chat";

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Find CM Property</title>
                <meta name="description" content="" />
                <meta
                    name="keywords"
                    content="real estate, chiangmai house, property"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Find CM Property" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" />
                <link rel="icon" href="" />
            </Head>
            {typeof window !== "undefiend" && (
                <MessengerCustomerChat
                    pageId="219615218531098"
                    appId="729744355296187"
                />
            )}
            <div
                className="bg-no-repeat bg-center bg-cover bg-fixed text-gray-900"
                style={
                    {
                        // backgroundImage: `url(${bgImage})`,
                    }
                }
            >
                <div
                    className={`min-h-screen flex flex-col`}
                    // style={{ backgroundColor: bgColor }}
                >
                    <Navbar />
                    <div className="flex-grow">{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Layout;
