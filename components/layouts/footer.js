import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
    return (
        <footer className="py-3 w-full border-t backdrop-blur-sm z-50 bg-white">
            <div className="max-w-[1150px] px-4 sm:px-6 mx-auto gap-y-2 flex flex-col md:flex-row justify-between items-center">
                <div className="text-sm md:text-base text-black/60">
                    © 2023 Find CM Property, All rights reserved.
                </div>
                <div className="flex justify-center items-center gap-x-2">
                    <div className="flex justify-center items-center gap-x-4 pr-4 mr-2 border-r border-gray-400/80">
                        <Link
                            href={"/terms"}
                            className="text-sm md:text-base text-black/60 transition-all hover:text-primary"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            href={"/policy"}
                            className="text-sm md:text-base text-black/60 transition-all hover:text-primary"
                        >
                            Policy
                        </Link>
                    </div>

                    <Link
                        href="https://www.facebook.com/FindCMPropertyAgent"
                        target="_blank"
                        name="facebook"
                        className="inline-block p-2 font-medium text-sm md:text-base leading-tight rounded-full border border-gray-400/80 
                        transition duration-150 ease-in-out 
                        hover:bg-primary hover:bg-opacity-10 hover:border-primary active:scale-95"
                    >
                        <FaFacebookF />
                    </Link>
                    <Link
                        href="mailto:Findcmproperty@gmail.com"
                        name="email"
                        className="inline-block p-2 font-medium text-sm md:text-base leading-tight rounded-full border border-gray-400/80 
                        transition duration-150 ease-in-out 
                        hover:bg-primary hover:bg-opacity-10 hover:border-primary active:scale-95"
                    >
                        <HiOutlineMail />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
