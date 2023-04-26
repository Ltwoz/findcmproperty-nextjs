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
import { useRouter } from "next/router";

const categoryOptions = [
    { label: "House", value: "House" },
    { label: "Town House", value: "Town House" },
    { label: "Condo", value: "Condo" },
    { label: "Land", value: "Land" },
];

const typeOptions = [
    { label: "Sale", value: "Sale" },
    { label: "Rent", value: "Rent" },
];

const NewPropertyPage = () => {
    const router = useRouter();

    const [selectedCategory, setSelectedCategory] = useState({});
    const [selectedType, setSelectedType] = useState({});
    const [imagesPreview, setImagesPreview] = useState([]);

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

    async function submitForm(values, actions) {
        const config = { headers: { "Content-Type": "application/json" } };

        try {
            setLoading(true);

            const { data } = await axios.post(
                `/api/admin/properties/new-property`,
                values,
                config
            );

            await axios.post(
                `/api/admin/properties/cloudinary-create-folder?id=${data.property._id}`
            );
            
            setIsSuccess(data.success);

            router.push(`/dashboard/properties/new-property/${data.property._id}`);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>New Property - Find CM Property</title>
            </Head>
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">New Properties</h2>
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
                    <Formik
                        initialValues={{
                            category: {},
                            isActive: true,
                        }}
                        onSubmit={submitForm}
                    >
                        {(formik) => (
                            <Form className="w-full flex flex-col gap-4">
                                <div
                                    id="property-main"
                                    className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                                >
                                    <div className="col-span-12">
                                        <h3 className="text-base md:text-lg font-medium leading-6">
                                            Create New Property
                                        </h3>
                                        <p className="mt-1 text-xs md:text-sm text-gray-600">
                                            Create new property here.
                                        </p>
                                    </div>

                                    <hr className="col-span-12" />

                                    <div className="col-span-12">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Name
                                        </label>
                                        <Field
                                            type="text"
                                            name="name"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Description
                                        </label>
                                        <Field
                                            as="textarea"
                                            type="text"
                                            name="description"
                                            placeholder="Some description for this property"
                                            rows="4"
                                            className="mt-1 p-2 block w-full min-h-[42px] max-h-[210px] rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Property ID
                                        </label>
                                        <Field
                                            type="text"
                                            name="propertyId"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Price
                                        </label>
                                        <Field
                                            type="number"
                                            name="price"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide mb-1">
                                            Type
                                        </label>
                                        <Select
                                            name="type"
                                            placeholder="Select type"
                                            options={typeOptions}
                                            selected={selectedType}
                                            setSelected={(option) => {
                                                setSelectedType(option);
                                                formik.setFieldValue(
                                                    "type",
                                                    option.value
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-6 md:col-span-3">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide mb-1">
                                            Category
                                        </label>
                                        <Select
                                            name="category"
                                            placeholder="Select category"
                                            options={categoryOptions}
                                            selected={selectedCategory}
                                            setSelected={(option) => {
                                                setSelectedCategory(option);
                                                formik.setFieldValue(
                                                    "category",
                                                    option.value
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div
                                    id="details"
                                    className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                                >
                                    <div className="col-span-12">
                                        <h3 className="text-base md:text-lg font-medium leading-6">
                                            Details
                                        </h3>
                                        <p className="mt-1 text-xs md:text-sm text-gray-600">
                                            Details for this property.
                                        </p>
                                    </div>

                                    <hr className="col-span-12" />

                                    <div className="col-span-4">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Bedroom
                                        </label>
                                        <Field
                                            type="number"
                                            name="details.beds"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Bathroom
                                        </label>
                                        <Field
                                            type="number"
                                            name="details.baths"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-4">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Area (sqm.)
                                        </label>
                                        <Field
                                            type="number"
                                            name="details.areaSqM"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>

                                    <hr className="col-span-12" />

                                    <div className="col-span-12 grid grid-cols-2 gap-y-8 md:gap-y-0">
                                        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 md:gap-6">
                                            <div>
                                                <h3 className="text-base md:text-lg font-medium leading-6">
                                                    Facilities
                                                </h3>
                                                <p className="mt-1 text-xs md:text-sm text-gray-600">
                                                    Facilities for this
                                                    property.
                                                </p>
                                            </div>
                                            <hr className="col-span-12" />
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.ac"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Air Conditioner
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.balcony"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Balcony
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.tv"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Television
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.internet"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Internet
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.pet"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Pet Allowed
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="features.bathtub"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Bathtub
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-2 md:col-span-1 flex flex-col gap-4 md:gap-6">
                                            <div>
                                                <h3 className="text-base md:text-lg font-medium leading-6">
                                                    Conveniences
                                                </h3>
                                                <p className="mt-1 text-xs md:text-sm text-gray-600">
                                                    Conveniences for this
                                                    property.
                                                </p>
                                            </div>
                                            <hr className="col-span-12" />
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.security"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Security
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.cctv"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        CCTV
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.elevator"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Elevator
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.pool"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Swimming Pool
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.gym"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Fitness / Gym
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.parking"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Parking
                                                    </label>
                                                </div>
                                                <div className="col-span-1 flex items-center">
                                                    <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                        <Field
                                                            type="checkbox"
                                                            name="services.garden"
                                                            className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                        />
                                                        Garden / Yard
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="location"
                                    className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                                >
                                    <div className="col-span-12">
                                        <h3 className="text-base md:text-lg font-medium leading-6">
                                            Location
                                        </h3>
                                        <p className="mt-1 text-xs md:text-sm text-gray-600">
                                            Location and address for this
                                            property.
                                        </p>
                                    </div>

                                    <hr className="col-span-12" />

                                    <div className="col-span-12">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Address
                                        </label>
                                        <Field
                                            type="text"
                                            name="address"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-12">
                                        <div className="flex items-center justify-center border rounded-md h-[200px]">
                                            Google Map.
                                        </div>
                                    </div>
                                    <div className="col-span-6">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Latitude
                                        </label>
                                        <Field
                                            type="text"
                                            name="coordinate.lat"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                    <div className="col-span-6">
                                        <label className="block text-xs md:text-sm font-medium tracking-wide">
                                            Longitude
                                        </label>
                                        <Field
                                            type="text"
                                            name="coordinate.lng"
                                            className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                        />
                                    </div>
                                </div>
                                <div
                                    id="submit"
                                    className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                                >
                                    <div className="col-span-12 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-base md:text-lg font-medium leading-6">
                                                Active
                                            </h4>
                                            <p className="mt-1 text-xs md:text-sm text-gray-600">
                                                Turn this off will hide this
                                                porperty from user.
                                            </p>
                                        </div>
                                        <label className="inline-flex relative items-center">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                className="sr-only peer"
                                                checked={formik.values.isActive}
                                                readOnly
                                            />
                                            <div
                                                onClick={() => {
                                                    formik.setFieldValue(
                                                        "isActive",
                                                        !formik.values.isActive
                                                    );
                                                }}
                                                className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                            />
                                        </label>
                                    </div>

                                    <hr className="col-span-12" />

                                    <div className="col-span-12 flex items-center justify-between">
                                        <div>
                                            <h4 className="text-base md:text-lg font-medium leading-6">
                                                Featured property
                                            </h4>
                                            <p className="mt-1 text-xs md:text-sm text-gray-600">
                                                Turn on will show this property
                                                in the homepage.
                                            </p>
                                        </div>
                                        <label className="inline-flex relative items-center">
                                            <input
                                                type="checkbox"
                                                name="isFeatured"
                                                className="sr-only peer"
                                                checked={
                                                    formik.values.isFeatured
                                                }
                                                readOnly
                                            />
                                            <div
                                                onClick={() => {
                                                    formik.setFieldValue(
                                                        "isFeatured",
                                                        !formik.values
                                                            .isFeatured
                                                    );
                                                }}
                                                className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                            />
                                        </label>
                                    </div>

                                    <hr className="col-span-12" />

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
                                                    {loading
                                                        ? "Loading"
                                                        : "Create"}
                                                </span>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
        </Layout>
    );
};

export default NewPropertyPage;
