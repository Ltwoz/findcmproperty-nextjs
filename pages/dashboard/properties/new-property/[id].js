import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import Layout from "@/components/layouts/layout";
import Head from "next/head";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/contexts/toast-context";
import Select from "@/components/ui/select-dropdown";
import CloudinaryButton from "@/components/cloudinary/cloudinary-button";

const UploadImage = ({ id, cloudName, apiKey }) => {
    const [images, setImages] = useState([]);

    // CRUD State.
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    useEffect(() => {
        if (error) {
            toast.add({
                title: "Failed!",
                text: error,
                icon: "error",
            });
            setError(null);
        }

        if (isSuccess) {
            toast.add({
                title: "Success!",
                text: "Created new property.",
                icon: "success",
            });
            setIsSuccess(false);
        }
    }, [error, isSuccess, toast]);

    async function submitHandler() {
        const config = { headers: { "Content-Type": "application/json" } };

        try {
            setLoading(true);

            const { data } = await axios.put(
                `/api/admin/properties/${id}`,
                {
                    images
                },
                config
            );

            setIsSuccess(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    function insertHandler(data) {
        let updateImages = [];

        data.assets.forEach((asset) => {
            updateImages.push({
                public_id: asset.public_id,
                url: asset.secure_url,
            });
        });
        console.log(updateImages);
        setImages(updateImages);
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>Upload Images - Find CM Property</title>
            </Head>
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">Upload Images</h2>
                        <p className="text-sm">Welcome to admin panel</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">
                            <span>Home</span> / <span>Dashboard</span> /{" "}
                            <span>Properties</span> /{" "}
                            <span>New Properties</span>
                        </p>
                    </div>
                </div>
            </div>
            <section id="main" className="flex justify-center items-center">
                <div className="w-full mb-6">
                    <div className="w-full flex flex-col gap-4">
                        <div
                            id="images"
                            className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                        >
                            <div className="col-span-12">
                                <h3 className="text-base md:text-lg font-medium leading-6">
                                    Upload Images
                                </h3>
                                <p className="mt-1 text-xs md:text-sm text-gray-600">
                                    Upload images here.
                                </p>
                            </div>

                            <hr className="col-span-12" />

                            <div className="col-span-12">
                                <div className="col-span-12">
                                    <div>
                                        <CloudinaryButton
                                            id={id}
                                            cloudName={cloudName}
                                            apiKey={apiKey}
                                            insertHandler={insertHandler}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div
                            id="submit"
                            className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                            onClick={submitHandler}
                        >
                            <div className="col-span-12 flex items-center justify-end gap-x-4">
                                <button
                                    type="submit"
                                    disabled={loading ? true : false}
                                    className="inline-flex items-center bg-primary disabled:bg-gray-400 rounded-md transition-all overflow-hidden disabled:cursor-not-allowed"
                                >
                                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={2.5}
                                            stroke="currentColor"
                                            className="w-5 h-5 mr-2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="block">
                                            {loading ? "Loading" : "Upload"}
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default UploadImage;

export const getServerSideProps = async (ctx) => {
    const id = ctx.params.id;
    const cloudName = process.env.CLOUDINARY_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;

    return {
        props: {
            id,
            cloudName,
            apiKey,
        },
    };
};
