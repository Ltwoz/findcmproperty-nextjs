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

const AdminUsersPage = () => {
    const { data: session } = useSession();

    // Modals State.
    const [isUpdateModal, setIsUpdateModal] = useState(false);

    // CRUD State.
    const [loading, setLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    // Users State.
    const [users, setUsers] = useState({});
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
            let link = `/api/admin/users?findUser=${
                search ? search : ""
            }&page=${page}`;

            const { data } = await axios.get(link);

            setUsers(data);
            setLoading(false);
        };

        getUsers().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [page, search, isUpdated, isDeleted]);

    useEffect(() => {
        if (error) {
            toast.add({
                title: "Failed!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isUpdated) {
            toast.add({
                title: "Success!",
                text: "Updated user.",
                icon: "success",
            });
            setIsUpdated(false);
        }

        if (isDeleted) {
            toast.add({
                title: "Success!",
                text: "Deleted user.",
                icon: "success",
            });
            setIsDeleted(false);
        }
    }, [error, isDeleted, isUpdated, toast]);

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>Users Dashboard - Find CM Property</title>
            </Head>
            <AnimatePresence>
                {isUpdateModal && (
                    <UpdateUserModal
                        user={selectedUser}
                        setIsOpen={setIsUpdateModal}
                        setIsUpdated={setIsUpdated}
                        setError={setError}
                    />
                )}
            </AnimatePresence>
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">All Users</h2>
                        <p className="text-sm">Welcome to admin panel</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">
                            <span>Home</span> / <span>Dashboard</span> /{" "}
                            <span>Users</span>
                        </p>
                    </div>
                </div>
            </div>
            <section id="main" className="flex justify-center items-center">
                <div className="w-full mb-6">
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
                            {users.users.length < 1 ? (
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
                                                        Username
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-60 md:w-64">
                                                        Email
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-36">
                                                        Role
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-28">
                                                        <span className="hidden">
                                                            Action
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm md:text-base">
                                                {users.users?.map((user) => (
                                                    <tr
                                                        key={user._id}
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6 text-left">
                                                            {user.username}{" "}
                                                            {session?.user
                                                                .id === user._id
                                                                ? "(Me)"
                                                                : ""}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {user.email}
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <span
                                                                // className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300"
                                                                className={`text-sm font-medium px-2.5 py-0.5 rounded-full
                                                        ${
                                                            user?.role ===
                                                            "admin"
                                                                ? "bg-amber-700 text-amber-200"
                                                                : user?.role ===
                                                                  "user"
                                                                ? "bg-blue-800 text-blue-200"
                                                                : ""
                                                        }`}
                                                            >
                                                                {user.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-6 text-center">
                                                            <div className="flex item-center justify-end gap-x-2">
                                                                <div
                                                                    onClick={() => {
                                                                        setSelectedUser(
                                                                            user
                                                                        );
                                                                        setIsUpdateModal(
                                                                            (
                                                                                prevState
                                                                            ) =>
                                                                                !prevState
                                                                        );
                                                                    }}
                                                                    className="transform hover:text-primary hover:border-primary hover:scale-110 transition-all border rounded-full p-2 hover:cursor-pointer"
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
                                                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {!(
                                        page === 0 || users.totalPageCount < 2
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

export default AdminUsersPage;
