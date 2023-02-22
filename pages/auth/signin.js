import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import {
    getSession,
    signIn,
    getProviders,
    getCsrfToken,
} from "next-auth/react";
import Layout from "@/components/layouts/layout";
import { useToast } from "@/components/contexts/toast-context";

const SignInPage = () => {
    const router = useRouter();
    const usernameRef = useRef();
    const passwordRef = useRef();

    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredUsername = usernameRef.current?.value;
        const enteredPassword = passwordRef.current?.value;

        const result = await signIn("credentials", {
            redirect: false,
            username: enteredUsername,
            password: enteredPassword,
        });

        if (result.ok) {
            toast.add({
                title: "สำเร็จ!",
                text: "กำลังพาคุณเข้าสู่ระบบ",
                icon: "success",
            });
            router.replace("/");
        } else {
            toast.add({
                title: "ผิดพลาด!",
                text: error,
                icon: "error",
            });
        }
    };

    return (
        <Layout>
            <main className="max-w-[1150px] h-full sm:px-[17px] pb-4 sm:pb-[25px] pt-20 md:pt-28 mx-auto items-center">
                <div className="w-full flex items-center justify-center">
                    <div className="w-[95vw] md:w-[30rem] p-6 bg-white rounded-lg shadow-md border">
                        <div className="mb-7 text-center">
                            <h3 className="font-semibold text-2xl text-gray-800">
                                Sign In
                            </h3>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="">
                                <input
                                    className=" w-full text-sm px-4 py-3 bg-gray-200 focus:bg-gray-100 border  border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                                    type="text"
                                    ref={usernameRef}
                                    placeholder="Username"
                                />
                            </div>
                            <div className="relative">
                                <input
                                    placeholder="Password"
                                    type="password"
                                    ref={passwordRef}
                                    className="text-sm px-4 py-3 rounded-lg w-full bg-gray-200 focus:bg-gray-100 border border-gray-200 focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center justify-end text-sm">
                                <a
                                    href="#"
                                    className="text-primary hover:brightness-95 hover:underline"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full inline-flex items-center bg-primary rounded-lg transition-all overflow-hidden"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-3 px-4">
                                        <span className="block tracking-wide">
                                            Sign In
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </form>
                        <p className="text-gray-400 text-center text-sm mt-8">
                            Don&apos;t have account?{" "}
                            <Link
                                href="/auth/register"
                                className="text-sm ml-1 text-primary hover:brightness-95 hover:underline"
                            >
                                Create new
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </Layout>
    );
};

export default SignInPage;

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
            providers: await getProviders(),
            // csrfToken: await getCsrfToken(context),
        },
    };
};
