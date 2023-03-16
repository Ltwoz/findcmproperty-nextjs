import { useSidebar } from "@/components/contexts/sidebar-context";
import DashboardSidebar from "@/components/layouts/dashboard-sidebar";
import Layout from "@/components/layouts/layout";
import Head from "next/head";
import { motion } from "framer-motion";

const DashboardPage = () => {
    const { isOpen, isMobile } = useSidebar();

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>Dashboard - Find CM Property</title>
            </Head>
            <div className="w-full px-2">
                <div
                    id="header"
                    className="flex py-6 items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <p className="text-sm">Welcome to admin panel</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">
                            <span>Home</span> / <span>Dashboard</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full px-2"></div>
        </Layout>
    );
};

export default DashboardPage;
