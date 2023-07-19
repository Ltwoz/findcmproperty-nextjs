import Layout from "@/components/layouts/layout";
import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const getProperties = async () => {
            const { data } = await axios.get(`/api/admin/properties`);
            setProperties(data?.properties);
        };
        const getUsers = async () => {
            const { data } = await axios.get(`/api/admin/users`);
            setUsers(data?.users);
        };

        const getMessages = async () => {
            const { data } = await axios.get(`/api/admin/messages`);
            setMessages(data?.messages);
        };
        
        getProperties();
        getUsers();
        getMessages();
    }, []);

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>Dashboard - Find CM Property</title>
            </Head>
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
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
            <div className="w-full mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1 bg-[#f1f1f1] rounded-lg p-4 flex flex-col">
                        <h4 className="text-gray-500 text-sm font-medium">
                            Total Properties
                        </h4>
                        <p className="font-semibold text-2xl mt-2">{properties?.length}</p>
                    </div>
                    <div className="md:col-span-1 bg-[#f1f1f1] rounded-lg p-4 flex flex-col">
                        <h4 className="text-gray-500 text-sm font-medium">
                            Total Users
                        </h4>
                        <p className="font-semibold text-2xl mt-2">{users?.length}</p>
                    </div>
                    <div className="md:col-span-1 bg-[#f1f1f1] rounded-lg p-4 flex flex-col">
                        <h4 className="text-gray-500 text-sm font-medium">
                            Total Messages
                        </h4>
                        <p className="font-semibold text-2xl mt-2">{messages?.length}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
