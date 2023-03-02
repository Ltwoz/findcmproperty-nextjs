import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
// import { DashboardNavList } from "./dashboard-navbar";
import { useSession, signOut } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
    const router = useRouter();

    const { data: session, status } = useSession();
    const user = session?.user;

    const mobileNavRef = useRef();

    const [showMenu, setShowMenu] = useState(false);
    const [openNav, setOpenNav] = useState(false);

    useEffect(() => {
        const menuHandler = () => setShowMenu(false);
        const navHandler = () => setOpenNav(false);

        window.addEventListener("click", menuHandler);
        window.addEventListener("click", navHandler);

        return () => {
            window.removeEventListener("click", menuHandler);
            window.removeEventListener("click", navHandler);
        };
    }, []);

    const handleMenuClick = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    };

    const handleNavClick = (e) => {
        e.stopPropagation();
        setOpenNav(!openNav);
        setShowMenu(false);
    };

    const logoutHandler = (e) => {
        e.preventDefault();
        signOut({
            redirect: false,
        });
        router.replace("/");
    };

    const navList = (
        <div className="md:space-x-8 flex flex-col md:flex-row font-medium text-sm md:text-base [&>*]:transition-all [&>*]:duration-200">
            <Link
                scroll={false}
                href={`/properties`}
                className="py-2 hover:text-primary"
            >
                Explore
            </Link>
            <Link
                scroll={false}
                href={{
                    pathname: "/properties",
                    query: { status: "Sale" },
                }}
                className="py-2 hover:text-primary"
            >
                Buy
            </Link>
            <Link
                scroll={false}
                href={{
                    pathname: "/properties",
                    query: { status: "Rent" },
                }}
                className="py-2 hover:text-primary"
            >
                Rent
            </Link>
            <Link
                scroll={false}
                href={`/contact`}
                className="py-2 hover:text-primary"
            >
                Contact
            </Link>
            {user?.role === "admin" && (
                <Link
                    scroll={false}
                    href={`/dashboard`}
                    className="py-2 hover:text-primary text-blue-700 md:hidden"
                >
                    Dashboard
                </Link>
            )}
        </div>
    );

    const userAuthButton =
        status === "authenticated" ? (
            <div className="md:flex text-left items-center">
                <div className="flex items-center px-[1px]">
                    <div
                        className={`w-full md:hover:cursor-pointer flex justify-between items-center rounded-md md:px-2 py-1 text-gray-700 md:ring-1 md:ring-transparent md:hover:ring-primary/50 md:hover:bg-primary/5 ${
                            showMenu ? "md:ring-primary/50 md:bg-primary/5" : ""
                        } select-none transition-all`}
                        onClick={handleMenuClick}
                    >
                        <div className="flex flex-row items-center gap-2 md:mr-6">
                            <div className="aspect-square w-7 h-7 relative overflow-hidden rounded-full">
                                <Image
                                    alt="avatar"
                                    src={user?.avatar}
                                    draggable="false"
                                    fill
                                    className="select-none object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <div className="text-sm leading-4 font-medium">
                                    {user?.username}
                                </div>
                                <div className="text-xs leading-4 font-semibold text-primary">
                                    {user?.role}
                                </div>
                            </div>
                        </div>
                        <div className="inline-flex items-center md:mr-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className={
                                    "h-5 md:h-3 w-5 md:w-3 transition duration-200" +
                                    (showMenu ? " -rotate-180" : "")
                                }
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div
                    id="menu"
                    className={`absolute right-4 md:right-6 top-[calc(100%-10px)] md:top-[calc(100%+4px)] z-[99] mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                    style={{ display: showMenu ? "" : "none" }}
                >
                    <div className="py-1">
                        <Link
                            scroll={false}
                            href={`/profile`}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-primary/10"
                        >
                            Profile
                        </Link>
                        <Link
                            scroll={false}
                            href={`/history/topups`}
                            className="text-gray-700 block px-4 py-2 text-sm hover:bg-primary/10"
                        >
                            Wishlist
                        </Link>
                    </div>
                    {user?.role === "admin" && (
                        <div className="py-1">
                            <Link
                                scroll={false}
                                href={`/dashboard`}
                                className="text-blue-700 block px-4 py-2 text-sm hover:bg-primary/10"
                            >
                                Dashboard
                            </Link>
                        </div>
                    )}
                    <div className="py-1">
                        <button
                            onClick={logoutHandler}
                            className="text-red-600 w-full text-left px-4 py-2 text-sm hover:bg-primary/10"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </div>
        ) : status === "loading" ? (
            <div className="relative flex items-center">
                <div className="w-6 h-6 border-[3px] border-gray-300/80 border-t-[3px] border-t-gray-800/80 rounded-[50%] animate-spin"></div>
            </div>
        ) : (
            <div className="gap-x-4 flex justify-center font-medium text-base px-[1px]">
                <Link
                    scroll={false}
                    href={`/auth/signin`}
                    className="w-full md:w-fit inline-flex items-center rounded-lg transition-all overflow-hidden ring-1 ring-primary "
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium hover:backdrop-brightness-95 py-2 px-4 hover:bg-primary/5">
                        <span className="block tracking-wide">Sign in</span>
                    </div>
                </Link>
                <Link
                    scroll={false}
                    href={`/auth/signup`}
                    className="w-full md:w-fit inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <span className="block tracking-wide">Sign up</span>
                    </div>
                </Link>
            </div>
        );

    return (
        <nav className="relative px-2 md:px-0 py-2 md:py-3 w-full md:border-b bg-white z-30">
            <div className="block md:flex relative justify-between items-center max-w-[1150px] w-full px-5 mx-auto">
                <div className="flex items-center w-full md:w-auto">
                    <div className="flex items-center justify-between w-full md:w-auto gap-8">
                        <Link
                            scroll={false}
                            href={`/`}
                            className="flex md:w-auto justify-center items-center"
                        >
                            <div className="relative h-8 sm:h-10 w-8 sm:w-16">
                                <Image
                                    alt="logo_img"
                                    src={"/findcm.png"}
                                    draggable="false"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>

                        <div className="flex items-center md:hidden">
                            <div onClick={handleNavClick}>
                                {openNav ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="h-6 w-6"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:block">{navList}</div>

                <div className="hidden md:block">{userAuthButton}</div>

                <AnimatePresence>
                    <motion.div
                        id="mobile-nav"
                        ref={mobileNavRef}
                        className="block md:hidden w-full overflow-hidden"
                        animate={openNav ? "mount" : "unmount"}
                        initial="unmount"
                        exit="unmount"
                        variants={{
                            unmount: {
                                height: 0,
                                opacity: 0,
                                visibility: "hidden",
                                borderTop: "0px solid",
                                marginTop: "0px",
                                paddingTop: "0px",
                                transition: { duration: 0.2 },
                            },
                            mount: {
                                height: `${
                                    status === "unauthenticated"
                                        ? `210px`
                                        : user?.role !== "admin"
                                        ? `204px`
                                        : `240px`
                                }`,
                                opacity: 1,
                                visibility: "visible",
                                borderTop: "2px solid rgba(209,213,219,0.8)",
                                marginTop: "16px",
                                paddingTop: "8px",
                                transition: { duration: 0.2 },
                            },
                        }}
                    >
                        {navList}
                        <div className="mt-2">{userAuthButton}</div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
