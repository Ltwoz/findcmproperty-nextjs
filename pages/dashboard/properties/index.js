import { useToast } from "@/components/contexts/toast-context";
import DashboardNavbar from "@/components/layouts/dashboard-navbar";
import Layout from "@/components/layouts/layout";
import LoadingSpiner from "@/components/ui/spiner";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

const AdminPropertiesPage = () => {
    const [properties, setProperties] = useState([]);
    const [data, setData] = useState({});

    const [loading, setLoading] = useState(true);
    const [isDeleted, setIsDeleted] = useState(false);
    const [error, setError] = useState(null);

    const [link, setLink] = useState(`/api/admin/properties`);

    const toast = useToast();

    useEffect(() => {
        const getProperties = async () => {
            const { data } = await axios.get(link);
            setData(data);
            setProperties(data?.properties);
            setLoading(false);
        };

        getProperties().catch(() => {
            console.error;
            setLoading(false);
        });
    }, [link, isDeleted]);

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
                text: "Property deleted.",
                icon: "success",
            });
            setIsDeleted(false);
        }
    }, [error, isDeleted, toast]);

    const deleteHandler = async (selectedProperty) => {
        try {
            const { data } = await axios.delete(
                `/api/admin/properties/${selectedProperty._id}`
            );

            setIsDeleted(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }
    };

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>Properties Dashboard - Find CM Property</title>
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="container">
                    {loading ? (
                        <LoadingSpiner />
                    ) : (
                        <section className="bg-white border rounded-md shadow mb-6 divide-y">
                            <div className="p-6 flex items-center justify-between max-h-[88px]">
                                <h2 className="text-lg font-semibold">
                                    All Properties
                                </h2>
                                <div className="flex flex-row gap-x-4">
                                    <Link
                                        href={`/dashboard/properties/new-property`}
                                        className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
                                    >
                                        <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={2.5}
                                                stroke="currentColor"
                                                className="w-5 h-5 md:mr-2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span className="hidden md:block">
                                                New Property
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            {properties.length < 1 ? (
                                <div className="flex items-center justify-center py-6">
                                    <p className="font-medium text-gray-600">
                                        No property data.
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col overflow-x-auto">
                                    <table className="w-full table-fixed">
                                        <thead>
                                            <tr className="bg-gray-200 text-gray-600 text-sm leading-normal">
                                                <th className="py-3 px-6 text-left w-24">
                                                    #
                                                </th>
                                                <th className="py-3 px-6 text-left w-52 md:w-80">
                                                    NAME
                                                </th>
                                                <th className="py-3 px-6 text-left w-36">
                                                    CATEGORY
                                                </th>
                                                <th className="py-3 px-6 text-left w-20">
                                                    TYPE
                                                </th>
                                                <th className="py-3 px-6 text-left w-44">
                                                    DATE
                                                </th>
                                                <th className="py-3 px-6 text-left w-40">
                                                    <span className="hidden">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-gray-600 text-sm md:text-base">
                                            {properties?.map((property) => (
                                                <tr
                                                    key={property._id}
                                                    className="border-b border-gray-200 hover:bg-gray-100/80"
                                                >
                                                    <td className="py-3 px-6 text-left">
                                                        {property.propertyId}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {property.name}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {property?.category}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {property?.type}
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        {new Date(
                                                            property.createdAt
                                                        ).toLocaleString("en", {
                                                            dateStyle: "medium",
                                                            timeStyle: "short",
                                                            hour12: false,
                                                        })}
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex item-center justify-end gap-x-2">
                                                            <Link
                                                                href={`/properties/${property._id}`}
                                                                className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
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
                                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                                    />
                                                                    <path
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                        strokeWidth="2"
                                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                                    />
                                                                </svg>
                                                            </Link>
                                                            <Link
                                                                href={`/dashboard/properties/${property._id}`}
                                                                className="transform hover:text-primary hover:scale-110 transition-all border hover:border-primary rounded-full p-2"
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
                                                            </Link>
                                                            <button
                                                                onClick={(e) =>
                                                                    deleteHandler(
                                                                        property
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
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default AdminPropertiesPage;
