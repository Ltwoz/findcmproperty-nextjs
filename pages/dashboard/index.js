import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import Layout from "@/components/layouts/layout";
import Head from "next/head";

const DashboardPage = () => {
    return (
        <Layout>
            <Head>
                <title>Dashboard - Find CM Property</title>
            </Head>
            <DashboardNavbar />
            <section id="main" className="flex justify-center items-center">
                <div className="container"></div>
            </section>
        </Layout>
    );
};

export default DashboardPage;
