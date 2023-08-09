import Layout from "@/components/layouts/layout";
import Head from "next/head";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useToast } from "@/components/contexts/toast-context";
import Select from "@/components/ui/select-dropdown";
import LoadingSpiner from "@/components/ui/spiner";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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

const UpdatePropertyPage = ({ id }) => {
    const [property, setProperty] = useState({});

    // CRUD State.
    const [firstLoad, setFirstLoad] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [propertyId, setPropertyId] = useState("");
    const [price, setPrice] = useState("");
    const [type, setType] = useState({});
    const [category, setCategory] = useState({});
    const [address, setAddress] = useState("");

    const [details, setDetails] = useState({
        areaSqM: "",
        beds: "",
        baths: "",
    });
    const [features, setFeatures] = useState({
        ac: "",
        balcony: "",
        tv: "",
        internet: "",
        pet: "",
        bathtub: "",
    });
    const [services, setServices] = useState({
        security: "",
        cctv: "",
        elevator: "",
        pool: "",
        gym: "",
        parking: "",
        garden: "",
    });
    const [files, setFiles] = useState([]);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const [isActive, setIsActive] = useState(null);
    const [isFeatured, setIsFeatured] = useState(null);

    const toast = useToast();

    useEffect(() => {
        const getProperty = async () => {
            try {
                const { data } = await axios.get(`/api/admin/properties/${id}`);
                setProperty(data.property);
            } catch (error) {
                console.log(error);
            } finally {
                setFirstLoad(false);
            }
        };

        if (id) {
            getProperty();
        }
    }, [id]);

    useEffect(() => {
        setName(property.name);
        setDescription(property.description);
        setPropertyId(property.propertyId);
        setPrice(property.price);
        setType({ label: property.type, value: property.type });
        setCategory({ label: property.category, value: property.category });

        setDetails({
            areaSqM: property.details?.areaSqM,
            beds: property.details?.beds,
            baths: property.details?.baths,
        });
        setAddress(property.address);
        setFeatures({
            ac: property.features?.ac,
            balcony: property.features?.balcony,
            tv: property.features?.tv,
            internet: property.features?.internet,
            pet: property.features?.pet,
            bathtub: property.features?.bathtub,
        });
        setServices({
            security: property.services?.security,
            cctv: property.services?.cctv,
            elevator: property.services?.elevator,
            pool: property.services?.pool,
            gym: property.services?.gym,
            parking: property.services?.parking,
            garden: property.services?.garden,
        });
        setImages(property.images);
        setImagesPreview(property.images);
        setIsActive(property.isActive);
        setIsFeatured(property.isFeatured);
    }, [property]);

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
                text: "Property updated.",
                icon: "success",
            });
            setIsSuccess(false);
        }
    }, [error, isSuccess, toast]);

    async function submitForm(e) {
        e.preventDefault();

        const formData = new FormData();

        formData.set("name", name);
        formData.set("description", description);
        formData.set("propertyId", propertyId);
        formData.set("price", price);
        formData.set("type", type.value);
        formData.set("category", category.value);
        formData.set("details", JSON.stringify(details));
        formData.set("address", address);
        formData.set("features", JSON.stringify(features));
        formData.set("services", JSON.stringify(services));
        formData.set("isActive", isActive);
        formData.set("isFeatured", isFeatured);

        console.log("images before pass to form :", images);

        images.forEach((image) => {
            formData.append("images[]", JSON.stringify(image));
        });
        files.forEach((file) => {
            formData.append("files", file);
        });

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        try {
            setLoading(true);

            const { data } = await axios.put(
                `/api/admin/properties/${id}`,
                formData,
                config
            );

            setIsSuccess(data.success);
            console.log(data);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    function removeImage(index) {
        const filteredImagesPreview = imagesPreview.filter(
            (_, idx) => idx !== index
        );
        setImagesPreview(filteredImagesPreview);

        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    }

    if (firstLoad) {
        return (
            <Layout isDashboard={true}>
                <LoadingSpiner />
            </Layout>
        );
    }

    if (Object.keys(property).length === 0) {
        return (
            <Layout isDashboard={true}>
                <Head>
                    <title>Not found - Find CM Property</title>
                </Head>
                <div>Not found</div>
            </Layout>
        );
    }

    return (
        <Layout isDashboard={true}>
            <Head>
                <title>{name} - Find CM Property</title>
            </Head>
            <div className="w-full">
                <div
                    id="header"
                    className="flex flex-col md:flex-row gap-4 py-6 items-start md:items-center justify-between"
                >
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold">
                            Update Properties
                        </h2>
                        <p className="text-sm">Welcome to admin panel</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm">
                            <span>Home</span> / <span>Dashboard</span> /{" "}
                            <span>Properties</span> /{" "}
                            <span>Update Property</span>
                        </p>
                    </div>
                </div>
            </div>
            <section id="main" className="flex justify-center items-center">
                <div className="w-full mb-6">
                    <div className="w-full flex flex-col gap-4">
                        <div
                            id="property-main"
                            className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                        >
                            <div className="col-span-12">
                                <h3 className="text-base md:text-lg font-medium leading-6">
                                    Update Property
                                </h3>
                                <p className="mt-1 text-xs md:text-sm text-gray-600">
                                    Update property {name}
                                </p>
                            </div>

                            <hr className="col-span-12" />

                            <div className="col-span-12">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-12">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Description
                                </label>
                                <ReactQuill
                                    value={description}
                                    onChange={(value) => setDescription(value)}
                                    className="mt-1"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Property ID
                                </label>
                                <input
                                    type="text"
                                    name="propertyId"
                                    value={propertyId}
                                    onChange={(e) =>
                                        setPropertyId(e.target.value)
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6 md:col-span-3">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
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
                                    selected={type}
                                    setSelected={setType}
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
                                    selected={category}
                                    setSelected={setCategory}
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
                                <input
                                    type="number"
                                    name="details.beds"
                                    value={details.beds}
                                    onChange={(e) =>
                                        setDetails((prev) => ({
                                            ...prev,
                                            beds: e.target.value,
                                        }))
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Bathroom
                                </label>
                                <input
                                    type="number"
                                    name="details.baths"
                                    value={details.baths}
                                    onChange={(e) =>
                                        setDetails((prev) => ({
                                            ...prev,
                                            baths: e.target.value,
                                        }))
                                    }
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-4">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Area (sqm.)
                                </label>
                                <input
                                    type="number"
                                    name="details.areaSqM"
                                    value={details.areaSqM}
                                    onChange={(e) =>
                                        setDetails((prev) => ({
                                            ...prev,
                                            areaSqM: e.target.value,
                                        }))
                                    }
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
                                            Facilities for this property.
                                        </p>
                                    </div>
                                    <hr className="col-span-12" />
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.ac"
                                                    checked={features.ac}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            ac: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Air Conditioner
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.balcony"
                                                    checked={features.balcony}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            balcony:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Balcony
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.tv"
                                                    checked={features.tv}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            tv: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Television
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.internet"
                                                    checked={features.internet}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            internet:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Internet
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.pet"
                                                    checked={features.pet}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            pet: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Pet Allowed
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="features.bathtub"
                                                    checked={features.bathtub}
                                                    onChange={(e) =>
                                                        setFeatures((prev) => ({
                                                            ...prev,
                                                            bathtub:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
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
                                            Conveniences for this property.
                                        </p>
                                    </div>
                                    <hr className="col-span-12" />
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.security"
                                                    checked={services.security}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            security:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Security
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.cctv"
                                                    checked={services.cctv}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            cctv: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                CCTV
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.elevator"
                                                    checked={services.elevator}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            elevator:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Elevator
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.pool"
                                                    checked={services.pool}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            pool: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Swimming Pool
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.gym"
                                                    checked={services.gym}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            gym: e.target
                                                                .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Fitness / Gym
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.parking"
                                                    checked={services.parking}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            parking:
                                                                e.target
                                                                    .checked,
                                                        }))
                                                    }
                                                    className="p-2 block rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base hover:cursor-pointer"
                                                />
                                                Parking
                                            </label>
                                        </div>
                                        <div className="col-span-1 flex items-center">
                                            <label className="flex gap-2 hover:cursor-pointer select-none text-sm md:text-base">
                                                <input
                                                    type="checkbox"
                                                    name="services.garden"
                                                    checked={services.garden}
                                                    onChange={(e) =>
                                                        setServices((prev) => ({
                                                            ...prev,
                                                            garden: e.target
                                                                .checked,
                                                        }))
                                                    }
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
                                    Location and address for this property.
                                </p>
                            </div>

                            <hr className="col-span-12" />

                            <div className="col-span-12">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
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
                                <input
                                    type="text"
                                    name="coordinate.lat"
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                            <div className="col-span-6">
                                <label className="block text-xs md:text-sm font-medium tracking-wide">
                                    Longitude
                                </label>
                                <input
                                    type="text"
                                    name="coordinate.lng"
                                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm text-sm md:text-base"
                                />
                            </div>
                        </div>
                        <div
                            id="images"
                            className="grid grid-cols-12 w-full bg-white border rounded-md gap-4 md:gap-6 p-4 md:p-6"
                        >
                            <div className="col-span-12">
                                <h3 className="text-base md:text-lg font-medium leading-6">
                                    Images
                                </h3>
                                <p className="mt-1 text-xs md:text-sm text-gray-600">
                                    Images for this property.
                                </p>
                            </div>

                            <hr className="col-span-12" />

                            <div className="col-span-12">
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 hover:bg-gray-100"
                                >
                                    <span className="flex items-center space-x-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-gray-600"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                        <span className="font-medium text-gray-600">
                                            Click to upload{" "}
                                            <span className="text-blue-600">
                                                PNG, JPG
                                            </span>
                                        </span>
                                    </span>
                                    <input
                                        id="dropzone-file"
                                        type="file"
                                        accept=".jpeg, .jpg, .png, .mp4"
                                        multiple
                                        onChange={(e) => {
                                            const files = Array.from(
                                                e.target.files
                                            );
                                            console.log(files);

                                            files.forEach((file) => {
                                                setFiles((old) => [
                                                    ...old,
                                                    file,
                                                ]);

                                                const reader = new FileReader();

                                                reader.onload = () => {
                                                    if (
                                                        reader.readyState === 2
                                                    ) {
                                                        setImagesPreview(
                                                            (old) => [
                                                                ...old,
                                                                reader.result,
                                                            ]
                                                        );
                                                    }
                                                };
                                                reader.readAsDataURL(file);
                                            });
                                        }}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                            {imagesPreview?.length > 0 && (
                                <div className="col-span-12">
                                    <h3 className="text-base md:text-lg font-medium leading-6">
                                        Preview
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 mb-4">
                                        <span className="font-semibold">
                                            {images.length}
                                        </span>{" "}
                                        file(s)
                                    </p>

                                    <hr className="w-full mb-4" />

                                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4 overflow-hidden">
                                        {imagesPreview?.map((image, i) => (
                                            <div
                                                key={i}
                                                className="w-full aspect-square relative flex items-center rounded-lg overflow-hidden"
                                            >
                                                <Image
                                                    alt={"preview_image"}
                                                    src={
                                                        image.url
                                                            ? image.url
                                                            : image
                                                    }
                                                    draggable="false"
                                                    fill
                                                    className="select-none object-cover"
                                                />
                                                <div className="flex absolute top-1 right-1 z-[1]">
                                                    <button
                                                        onClick={() =>
                                                            removeImage(i)
                                                        }
                                                        className="bg-white text-red-600 transition-all border border-transparent hover:border-red-600 rounded-lg p-1"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            className="w-4 h-4 md:w-5 md:h-5"
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
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
                                        Turn this off will hide this porperty
                                        from user.
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        className="sr-only peer"
                                        checked={isActive}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsActive(!isActive);
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
                                        Turn on will show this property in the
                                        homepage.
                                    </p>
                                </div>
                                <label className="inline-flex relative items-center">
                                    <input
                                        type="checkbox"
                                        name="isFeatured"
                                        className="sr-only peer"
                                        checked={isFeatured}
                                        readOnly
                                    />
                                    <div
                                        onClick={() => {
                                            setIsFeatured(!isFeatured);
                                        }}
                                        className="w-11 h-6 cursor-pointer bg-gray-300 rounded-full peer peer-focus:ring-green-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                                    />
                                </label>
                            </div>

                            <hr className="col-span-12" />

                            <div className="col-span-12 flex items-center justify-end gap-x-4">
                                <button
                                    onClick={submitForm}
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
                                            {loading ? "Loading" : "Update"}
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

export default UpdatePropertyPage;

export const getServerSideProps = async (ctx) => {
    const id = ctx.params.id;

    return {
        props: {
            id,
        },
    };
};
