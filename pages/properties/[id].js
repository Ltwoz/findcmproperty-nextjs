import Layout from "@/components/layouts/layout";
import ContactForm from "@/components/ui/contact-form";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import axios from "axios";
import Image from "next/image";
import {
    FaBed,
    FaBath,
    FaExpand,
    FaMapMarkerAlt,
    FaWifi,
    FaTv,
} from "react-icons/fa";
import {
    MdBalcony,
    MdOutlinePets,
    MdOutlineSecurity,
    MdOutlinePool,
} from "react-icons/md";
import { BiCctv, BiDumbbell } from "react-icons/bi";
import { TbElevator } from "react-icons/tb";
import { RiParkingBoxLine } from "react-icons/ri";
import { GiTreeBranch } from "react-icons/gi";
import Head from "next/head";

const PropertyDetails = ({ property }) => {
    return (
        <Layout>
            <Head>
                <title>{property.name} - Find CM Property</title>
                <meta name="description" content={property.description} />
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="container">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="md:col-span-2">
                            <div className="flex flex-col">
                                <Splide
                                    className="mb-4 rounded-md overflow-hidden"
                                    hasTrack={false}
                                    options={{
                                        perPage: 1,
                                        flickPower: 100,
                                        type: "loop",
                                    }}
                                >
                                    <SplideTrack>
                                        {property.images?.map((image, i) => (
                                            <SplideSlide key={i}>
                                                <div className="w-full aspect-[16/9] relative flex items-center">
                                                    <Image
                                                        alt="property-image"
                                                        src={
                                                            image.url ||
                                                            `https://dummyimage.com/261x261`
                                                        }
                                                        unoptimized
                                                        draggable="false"
                                                        fill
                                                        className="select-none object-cover"
                                                    />
                                                </div>
                                            </SplideSlide>
                                        ))}
                                    </SplideTrack>
                                </Splide>

                                <div id="property-title" className="mb-4">
                                    <div className="flex gap-x-2 mb-4">
                                        <div
                                            className={
                                                "py-1.5 px-2.5 leading-none text-sm text-white font-semibold rounded bg-[#38a169]/90"
                                            }
                                        >
                                            {property.category}
                                        </div>
                                        <div
                                            className={
                                                "py-1.5 px-2.5 leading-none text-sm text-white font-semibold rounded" +
                                                (property.type === "Rent"
                                                    ? " bg-orange-500/90"
                                                    : " bg-red-500/90")
                                            }
                                        >
                                            {property.type}
                                        </div>
                                    </div>

                                    <div className="flex flex-col-reverse md:flex-row justify-between items-start gap-4 mb-4">
                                        <h1 className="text-3xl font-medium md:w-2/3">
                                            {property?.name}
                                        </h1>
                                        <div className="text-3xl font-medium md:w-1/3 text-end">
                                            ฿{property.price.toLocaleString()}
                                            {property.type === "Rent" ? (
                                                <span className="text-base">
                                                    {" "}
                                                    / month
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <FaMapMarkerAlt />
                                        <div className="text-lg">
                                            {property.address}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <FaBed />
                                            <div className="text-lg">
                                                <span className="mr-1 font-semibold">
                                                    {property.details?.beds}
                                                </span>
                                                bed
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaBath />
                                            <div className="text-lg">
                                                <span className="mr-1 font-semibold">
                                                    {property.details?.baths}
                                                </span>
                                                bath
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaExpand />
                                            <div className="text-lg">
                                                <span className="mr-1 font-semibold">
                                                    {property.details?.areaSqM}
                                                </span>
                                                sqm
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="property-details" className="py-8">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Property Details
                                    </h2>
                                    <div className="grid grid-cols-2 text-gray-800 gap-y-2">
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Property ID :
                                                </span>{" "}
                                                {property.propertyId}
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Status :
                                                </span>{" "}
                                                For {property.type}
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Type :
                                                </span>{" "}
                                                {property.category}
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Property Size :
                                                </span>{" "}
                                                {property.details.areaSqM} sqm
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Bedroom :
                                                </span>{" "}
                                                {property.details.beds}
                                            </p>
                                        </div>
                                        <div className="col-span-1">
                                            <p className="text-base">
                                                <span className="text-black font-medium">
                                                    Bathroom :
                                                </span>{" "}
                                                {property.details.baths}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    id="property-desc"
                                    className="py-8 border-t"
                                >
                                    <h2 className="text-xl font-semibold mb-4">
                                        Description
                                    </h2>
                                    <div
                                        className="text-gray-800"
                                        dangerouslySetInnerHTML={{
                                            __html: property.description,
                                        }}
                                    />
                                </div>

                                <div id="features" className="py-8 border-t">
                                    <h2 className="text-xl font-semibold mb-4">
                                        Features
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 text-gray-800 gap-y-2">
                                        {property.features.balcony && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <MdBalcony
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Balcony
                                                </div>
                                            </div>
                                        )}
                                        {property.features.ac && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <svg
                                                    fill="#000000"
                                                    viewBox="0 0 24 24"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="w-5 h-5"
                                                >
                                                    <g>
                                                        <path d="M21,2.5H3a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H21a1,1,0,0,0,1-1v-8A1,1,0,0,0,21,2.5Zm-3,8H6a1,1,0,0,1,0-2H18a1,1,0,0,1,0,2Zm0-4H17a1,1,0,0,1,0-2h1a1,1,0,0,1,0,2Z"></path>
                                                        <path d="M12.793,14.793l-2,2a1,1,0,0,0,0,1.414l.293.293L9.793,19.793a1,1,0,1,0,1.414,1.414l2-2a1,1,0,0,0,0-1.414l-.293-.293,1.293-1.293a1,1,0,0,0-1.414-1.414Z"></path>
                                                        <path d="M18.293,14.793l-2,2a1,1,0,0,0,0,1.414l.293.293-1.293,1.293a1,1,0,1,0,1.414,1.414l2-2a1,1,0,0,0,0-1.414l-.293-.293,1.293-1.293a1,1,0,0,0-1.414-1.414Z"></path>
                                                        <path d="M7.293,14.793l-2,2a1,1,0,0,0,0,1.414l.293.293L4.293,19.793a1,1,0,1,0,1.414,1.414l2-2a1,1,0,0,0,0-1.414L7.414,17.5l1.293-1.293a1,1,0,0,0-1.414-1.414Z"></path>
                                                    </g>
                                                </svg>
                                                <div className="text-base">
                                                    Air Conditioner
                                                </div>
                                            </div>
                                        )}
                                        {property.features.tv && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <FaTv
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Television
                                                </div>
                                            </div>
                                        )}
                                        {property.features.internet && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <FaWifi
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Internet
                                                </div>
                                            </div>
                                        )}
                                        {property.features.pet && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <MdOutlinePets
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Pet Allowed
                                                </div>
                                            </div>
                                        )}
                                        {property.features.bathtub && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <FaBath
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Bathtub
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div
                                    id="community-features"
                                    className="py-8 border-t"
                                >
                                    <h2 className="text-xl font-semibold mb-4">
                                        Community Features
                                    </h2>
                                    <div className="grid grid-cols-2 md:grid-cols-3 text-gray-800 gap-y-2">
                                        {property.services.security && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <MdOutlineSecurity
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Security
                                                </div>
                                            </div>
                                        )}
                                        {property.services.cctv && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <BiCctv
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    CCTV
                                                </div>
                                            </div>
                                        )}
                                        {property.services.elevator && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <TbElevator
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Elevator
                                                </div>
                                            </div>
                                        )}
                                        {property.services.parking && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <RiParkingBoxLine
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Parking
                                                </div>
                                            </div>
                                        )}
                                        {property.services.pool && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <MdOutlinePool
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Swimming Pool
                                                </div>
                                            </div>
                                        )}
                                        {property.services.gym && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <BiDumbbell
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Fitness
                                                </div>
                                            </div>
                                        )}
                                        {property.services.garden && (
                                            <div className="col-span-1 flex items-center gap-2">
                                                <GiTreeBranch
                                                    color="black"
                                                    className="w-5 h-5"
                                                />
                                                <div className="text-base">
                                                    Garden
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div
                                    id="map-location"
                                    className="py-8 border-t"
                                >
                                    <h2 className="text-xl font-semibold mb-4">
                                        Location
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="md:col-span-1 mb-4 md:mb-0">
                            <div className="flex flex-col gap-1.5 p-6 md:sticky md:top-[20px] bg-white border shadow rounded-md">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PropertyDetails;

export const getServerSideProps = async (context) => {
    const nextRequestMeta =
        context.req[
            Reflect.ownKeys(context.req).find(
                (s) => String(s) === "Symbol(NextRequestMeta)"
            )
        ];
    const protocal = nextRequestMeta._protocol;

    try {
        const id = context.params.id;
        const { data } = await axios.get(
            `${protocal}://${context.req.headers.host}/api/properties/${id}`
        );

        console.log(data);

        return {
            props: {
                property: data.property,
            },
        };
    } catch (error) {
        return {
            props: {
                error: error.response.data.message,
            },
            notFound: true,
        };
    }
};
