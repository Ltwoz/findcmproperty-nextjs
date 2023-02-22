import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
    getSession,
    signIn,
    getProviders,
    getCsrfToken,
} from "next-auth/react";
import axios from "axios";
import { useToast } from "@/components/contexts/toast-context";
import Layout from "@/components/layouts/layout";


const SignUpPage = () => {
    const router = useRouter();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [error, setError] = useState(null);

    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
            setError(null);
        }
    }, [error, toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current.value;
        const enteredEmail = emailRef.current.value;
        const enteredPassword = passwordRef.current.value;
        const enteredConfirmPassword = confirmPasswordRef.current.value;

        if (
            !enteredUsername ||
            !enteredEmail ||
            !enteredPassword ||
            !enteredConfirmPassword
        ) {
            return setError("กรุณากรอกข้อมูลให้ครบ");
        }

        if (enteredPassword !== enteredConfirmPassword) {
            confirmPasswordRef.current.focus();
            return setError("รหัสผ่านไม่ตรงกัน");
        }

        const config = { headers: { "Content-Type": "application/json" } };

        const result = await axios
            .post(
                "/api/auth/signup",
                {
                    username: enteredUsername,
                    email: enteredEmail,
                    password: enteredPassword,
                },
                config
            )
            .catch((error) => setError(error.response.data.message));

        if (result) {
            await signIn("credentials", {
                redirect: false,
                username: enteredUsername,
                password: enteredPassword,
            });
            toast.add({
                title: "สมัครสำเร็จ!",
                text: "กำลังพาคุณเข้าสู่ระบบ",
                icon: "success",
            });
            router.replace("/");
        }
    };

    return (
        <Layout>
            <main className="max-w-[1150px] h-full sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[95vw] md:w-[30rem] p-6 bg-white rounded-lg shadow-md border">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                Sign Up
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={usernameRef}
                                    placeholder="Username"
                                />
                            </div>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={emailRef}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="relative" x-data="{ show: true }">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    ref={passwordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div className="relative" x-data="{ show: true }">
                                <input
                                    placeholder="Confirm Password"
                                    type="password"
                                    ref={confirmPasswordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-3 px-4">
                                        <span className="block tracking-wide">
                                            Create Account
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            Already have account?{" "}
                            <Link
                                href="/auth/login"
                                className="text-sm ml-1 text-primary hover:brightness-95 hover:underline"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default SignUpPage;

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session && session.user) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
            props: {},
        };
    }

    return {
        props: {
            meta: { title: "Sign In" },
            providers: await getProviders(),
            // csrfToken: await getCsrfToken(context),
        },
    };
};
