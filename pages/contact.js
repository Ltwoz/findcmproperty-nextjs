import Layout from "@/components/layouts/layout";
import ContactForm from "@/components/ui/contact-form";
import Head from "next/head";

const DashboardPage = () => {
    return (
        <Layout>
            <Head>
                <title>Contact - Find CM Property</title>
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="container">
                    <div className="grid grid-cols-2 md:mt-10 gap-8 md:gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <h2 className="text-3xl font-semibold mb-6">
                                Contact us
                            </h2>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded bg-gray-500 text-gray-50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 512 512"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M256 352c-16.53 0-33.06-5.422-47.16-16.41L0 173.2V400C0 426.5 21.49 
                                                448 48 448h416c26.51 0 48-21.49 48-48V173.2l-208.8 162.5C289.1 346.6 
                                                272.5 352 256 352zM16.29 145.3l212.2 165.1c16.19 12.6 38.87 12.6 55.06 
                                                0l212.2-165.1C505.1 137.3 512 125 512 112C512 85.49 490.5 64 464 64h-416C21.49 
                                                64 0 85.49 0 112C0 125 6.01 137.3 16.29 145.3z"
                                            />
                                        </svg>
                                    </span>
                                    <div className="text-lg font-medium">
                                        Findcmproperty@gmail.com
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded text-blue-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 448 512"
                                            className="w-8"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 
                                                37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 
                                                38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"
                                            />
                                        </svg>
                                    </span>
                                    <div className="text-lg font-medium">
                                        Find CM Property
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="flex items-center justify-center w-8 h-8 rounded bg-red-500 text-gray-50">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 512 512"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 
                                                54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 
                                                108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 
                                                159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z"
                                            />
                                        </svg>
                                    </span>
                                    <div className="text-lg font-medium">
                                        0877866657
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 md:col-span-1">
                            <h2 className="text-3xl font-semibold mb-6">
                                Request a message
                            </h2>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default DashboardPage;
