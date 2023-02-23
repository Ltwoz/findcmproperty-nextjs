import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import Layout from "@/components/layouts/layout";
import LoadingSpiner from "@/components/ui/spiner";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const AdminUsersPage = () => {
    const [loading, setLoading] = useState(true);

    // Users State.
    const [users, setUsers] = useState({});
    const [selectedUser, setSelectedUser] = useState({});

    // Search State.
    const [search, setSearch] = useState("");
    const [debounceValue, setDebounceValue] = useState("");

    // Pagination State.
    const [page, setPage] = useState(1);

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            setSearch(debounceValue);
        }, 500);

        return () => clearTimeout(debounce);
    }, [debounceValue]);

    useEffect(() => {
        const getUsers = async () => {
            let link = `/api/admin/users?id=${
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
    }, [page, search]);

    return (
        <Layout>
            <Head>
                <title>Properties Dashboard - Find CM Property</title>
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
                                    จัดการผู้ใช้
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
                                        placeholder="ค้นหาชื่อหรืออีเมลผู้ใช้"
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
                                <div className="flex items-center justify-center py-6">
                                    <p className="font-medium text-gray-600">
                                        ไม่มีข้อมูลผู้ใช้
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col overflow-x-auto">
                                        <table className="w-full table-fixed">
                                            <thead>
                                                <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                                    <th className="py-3 px-6 text-left w-40 md:w-44">
                                                        ชื่อผู้ใช้
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-60 md:w-64">
                                                        อีเมล
                                                    </th>
                                                    <th className="py-3 px-6 text-left w-36">
                                                        พอยต์
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-36">
                                                        ตำแหน่ง
                                                    </th>
                                                    <th className="py-3 px-6 text-center w-28">
                                                        <span className="hidden">
                                                            Action
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-gray-600 text-sm md:text-base">
                                                {users.users.map((user) => (
                                                    <tr
                                                        key={user._id}
                                                        className="border-b border-gray-200 hover:bg-gray-100"
                                                    >
                                                        <td className="py-3 px-6 text-left">
                                                            {user.username}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {user.email}
                                                        </td>
                                                        <td className="py-3 px-6 text-left">
                                                            {new Intl.NumberFormat(
                                                                "en-US",
                                                                {
                                                                    minimumFractionDigits: 2,
                                                                }
                                                            ).format(
                                                                user?.point
                                                            )}
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
                                                                  "member"
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
