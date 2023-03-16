import dynamic from "next/dynamic";
import Head from "next/head";
const Navbar = dynamic(() => import("./navbar"));
const Footer = dynamic(() => import("./footer"));
import MessengerCustomerChat from "react-messenger-customer-chat";
import DashboardNavbar from "./dashboard-navbar";
import { motion } from "framer-motion";
import DashboardSidebar from "./dashboard-sidebar";
import { useSidebar } from "../contexts/sidebar-context";

const Layout = ({ children, isDashboard }) => {
    const { isOpen, isMobile } = useSidebar();

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
                id="page-wrapper"
                className={`min-h-screen flex flex-col text-gray-900`}
            >
                {isDashboard ? (
                    // Dashboard Layout.
                    <>
                        <DashboardNavbar />
                        <div className="flex-grow">
                            <section id="page-body-wrapper" className="">
                                <DashboardSidebar />
                                <motion.div
                                    id="page-body"
                                    className={`px-6 mt-20`}
                                    animate={isOpen ? "mount" : "unmount"}
                                    initial="unmount"
                                    exit="unmount"
                                    variants={{
                                        unmount: {
                                            marginLeft: 0,
                                            transition: { duration: 0.5 },
                                        },
                                        mount: {
                                            marginLeft: isMobile ? 0 : "280px",
                                            transition: { duration: 0.5 },
                                        },
                                    }}
                                >
                                    {children}
                                </motion.div>
                            </section>
                        </div>
                        <Footer />
                    </>
                ) : (
                    // User Layout.
                    <>
                        <Navbar />
                        <div className="flex-grow">{children}</div>
                        <Footer />
                    </>
                )}
            </div>
        </>
    );
};

export default Layout;
