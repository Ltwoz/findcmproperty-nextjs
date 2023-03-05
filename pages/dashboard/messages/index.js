import { useToast } from "@/components/contexts/toast-context";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import Layout from "@/components/layouts/layout";
import UpdateUserModal from "@/components/ui/modals/update-user-modal";
import LoadingSpiner from "@/components/ui/spiner";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const AdminMessagesPage = () => {
    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    // Users State.
    const [data, setData] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    // Search State.
    const [search, setSearch] = useState("");
    const [debounceValue, setDebounceValue] = useState("");

    // Pagination State.
    const [page, setPage] = useState(1);

    const toast = useToast();

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearch(debounceValue);
        }, 500);

        return () => clearTimeout(debounce);
    }, [debounceValue]);

    useEffect(() => {
        const getUsers = async () => {
            let link = `/api/admin/messages?page=${page}&message=${
                search ? search : ""
            }`;

            const { data } = await axios.get(link);

            console.log(data);
            setData(data);
            setLoading(false);
        };

        getUsers().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [page, search, isDeleted]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "Failed!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isDeleted) {
            toast.add({
                title: "Success!",
                text: "Deleted user.",
                icon: "success",
            });
            setIsDeleted(false);
        }
    }, [error, isDeleted, toast]);

    const deleteHandler = async (selectedMessage) => {
        try {
            const { data } = await axios.delete(
                `/api/admin/messages/${selectedMessage._id}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Users Dashboard - Find CM Property</title>
            </Head>
            <DashboardNavbar />
            <section id="main" className="flex justify-center items-center">
                <div className="container">
                    {loading ? (
                        <LoadingSpiner />
                    ) : (
                        <section className="bg-white border rounded-md shadow mb-6">
                            <div className="p-6 flex items-center justify-between max-h-[88px]">
                                <h2 className="hidden md:block text-lg font-semibold">
                                    All Users
                                </h2>
                                <div className="relative w-full md:w-fit">
                                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                        <svg
                                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        autoComplete="off"
                                        value={debounceValue}
                                        onChange={(e) =>
                                            setDebounceValue(e.target.value)
                                        }
                                        className="pl-10 p-2 w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                                    />
                                </div>
                            </div>
                            {data.messages.length < 1 ? (
                                <div className="flex items-center justify-center py-6 border-t">
                                    <p className="font-medium text-gray-600">
                                        No users data.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col overflow-x-auto">
                                        <table className="w-full table-fixed">
                                            <thead>
                                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                                    <th className="py-3 px-6 text-left w-40 md:w-44">
                                                        Name
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-60 md:w-64">
                                                        Email
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-36">
                                                        Phone
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-60 md:w-64">
                                                        Message
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-28">
                                                        <span className="hidden">
                                                            Action
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm md:text-base">
                                                {data.messages?.map(
                                                    (message) => (
                                                        <tr
                                                            key={message._id}
                                                            className="border-b border-gray-200 hover:bg-gray-100"
                                                        >
                                                            <td className="py-3 px-6 text-left">
                                                                {message.name}
                                                            </td>
                                                            <td className="py-3 px-6 text-left">
                                                                {message.email}
                                                            </td>
                                                            <td className="py-3 px-6 text-left">
                                                                {message.phone}
                                                            </td>
                                                            <td className="py-3 px-6 text-left">
                                                                {
                                                                    message.message
                                                                }
                                                            </td>
                                                            <td className="py-3 px-6 text-center">
                                                                <div className="flex item-center justify-end gap-x-2">
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteHandler(
                                                                                message
                                                                            )
                                                                        }
                                                                        className="transform text-red-600 hover:scale-110 transition-all border hover:border-red-600 rounded-full p-2"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke="currentColor"
                                                                            className="w-5 h-5"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                    {!(
                                        page === 0 || data.totalPageCount < 2
                                    ) && (
                                        <div
                                            id="pagination"
                                            className="flex px-6 py-3 items-center justify-center md:justify-end"
                                        >
                                            {/* <TablePagination
                                                currentPage={page}
                                                totalPage={users.totalPageCount}
                                                onPageChange={(page) =>
                                                    setPage(page)
                                                }
                                            /> */}
                                        </div>
                                    )}
                                </>
                            )}
                        </section>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default AdminMessagesPage;
