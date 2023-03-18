import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "../contexts/sidebar-context";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardSidebar = () => {
    const Menus = {
        main: [
            {
                name: "Dashboard",
                href: `/dashboard`,
                svg: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3",
            },
            {
                name: "New Property",
                href: `/dashboard/properties/new-property`,
                svg: "M12 4.5v15m7.5-7.5h-15",
            },
            {
                name: "Messages",
                href: `/dashboard/messages`,
                svg: "M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z",
            },
        ],
        manage: [
            {
                name: "Properties",
                href: `/dashboard/properties`,
                svg: "M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z",
            },
            {
                name: "Users",
                href: `/dashboard/users`,
                svg: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
            },
        ],
    };

    const { isOpen, setIsOpen, isMobile } = useSidebar();
    const router = useRouter();
    const { data: session } = useSession();
    const user = session?.user;

    // useEffect(() => {
    //     if (isMobile) {
    //         const sidebarHandler = () => setIsOpen(false);

    //         window.addEventListener("click", sidebarHandler);

    //         return () => {
    //             window.removeEventListener("click", sidebarHandler);
    //         };
    //     }
    // }, [isMobile, isOpen, setIsOpen]);

    return (
        <AnimatePresence mode="wait">
            <motion.div
                id="page-sidebar-wrapper"
                className="fixed top-0 z-[90] h-screen overflow-auto w-[280px] bg-white shadow-md"
                animate={isOpen ? "mount" : "unmount"}
                initial={isMobile ? "unmount" : "mount"}
                exit="unmount"
                variants={{
                    unmount: {
                        translateX: "-100%",
                        transition: { duration: 0.5 },
                    },
                    mount: {
                        translateX: 0,
                        transition: { duration: 0.5 },
                    },
                }}
            >
                <div id="logo-wrap" className="p-5 relative">
                    <Link
                        scroll={false}
                        href={`/`}
                        className="flex md:w-auto justify-center items-center"
                    >
                        <div className="relative h-10 w-16">
                            <Image
                                alt="logo_img"
                                src={"/findcm.png"}
                                draggable="false"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </Link>
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className={`absolute inset-y-0 right-5 xl:hidden inline-flex items-center font-medium text-black py-2 rounded-md hover:cursor-pointer transition-all`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                            />
                        </svg>
                    </div>
                </div>
                <ul id="main-sidebar">
                    <li className="bg-gray-100 p-5">
                        <div className="flex flex-row items-center gap-6">
                            <div className="aspect-square w-10 h-10 relative overflow-hidden rounded-full">
                                <Image
                                    alt="avatar"
                                    src={user?.avatar}
                                    draggable="false"
                                    fill
                                    className="select-none object-cover"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div className="text-base leading-4 font-medium">
                                    {user?.username}
                                </div>
                                <div className="text-sm leading-4 font-semibold text-primary">
                                    {user?.email}
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="mt-6">
                        <span className="block pl-4 mb-2 font-medium">
                            Main
                        </span>
                        <ul>
                            {Menus.main.map((menu, i) => {
                                const isActive = router.asPath === menu.href;
                                return (
                                    <li
                                        key={i}
                                        className={`hover:bg-gray-100 ${
                                            isActive ? "bg-gray-100" : ""
                                        }`}
                                        onClick={(e) =>
                                            isMobile
                                                ? setIsOpen(false)
                                                : e.preventDefault()
                                        }
                                    >
                                        <Link
                                            href={menu.href}
                                            className="flex items-center px-4 py-3 text-sm"
                                        >
                                            <div className="inline-flex items-center font-medium">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mr-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d={menu.svg}
                                                    />
                                                </svg>
                                                <span>{menu.name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                    <li className="mt-6">
                        <span className="block pl-4 mb-2 font-medium">
                            Manage
                        </span>
                        <ul>
                            {Menus.manage.map((menu, i) => {
                                const isActive = router.asPath === menu.href;
                                return (
                                    <li
                                        key={i}
                                        className={`hover:bg-gray-100 ${
                                            isActive ? "bg-gray-100" : ""
                                        }`}
                                        onClick={(e) =>
                                            isMobile
                                                ? setIsOpen(false)
                                                : e.preventDefault()
                                        }
                                    >
                                        <Link
                                            href={menu.href}
                                            className="flex items-center px-4 py-3 text-sm"
                                        >
                                            <div className="inline-flex items-center font-medium">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="w-5 h-5 mr-3"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d={menu.svg}
                                                    />
                                                </svg>
                                                <span>{menu.name}</span>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </li>
                </ul>
            </motion.div>
        </AnimatePresence>
    );
};

export default DashboardSidebar;
