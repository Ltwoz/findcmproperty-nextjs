import Layout from "@/components/layouts/layout";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { useEffect, useState } from "react";
import axios from "axios";
import FeaturedPropertyCard from "@/components/ui/cards/featured-property-card";
import Image from "next/image";

export default function Home() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFeaturedProperties = async () => {
            const { data } = await axios.get(
                `/api/properties?isFeatured=true&isActive=true`
            );
            setProperties(data?.properties);
            setLoading(false);
        };

        getFeaturedProperties().catch(() => {
            console.error;
            setLoading(false);
        });
    }, []);

    return (
        <Layout>
            <div className="fixed inset-0 w-full h-full z-[-1]">
                <Image
                    alt="property-image"
                    src={`/housing.jpg`}
                    draggable="false"
                    fill
                    className="absolute select-none object-cover z-[-1]"
                />
            </div>
            <div className="w-full h-full py-[220px] relative flex items-center">
                <div className="absolute z-[1] inset-0 w-full h-full overflow-hidden bg-black/40" />
                <div className="container z-[2]">
                    <div className="flex flex-col justify-center items-center gap-4 text-white">
                        <h1 className="text-5xl font-bold">
                            Discover your place to live
                        </h1>
                        <p className="text-xl font-semibold">
                            Get started in few clicks.
                        </p>
                    </div>
                </div>
            </div>

            {properties.length > 0 && (
                <section
                    id="featured-property"
                    className="flex justify-center items-center bg-gray-100"
                >
                    <div className="container">
                        <div className="flex flex-col justify-center items-center gap-y-2 my-10">
                            <h2 className="text-3xl font-bold">
                                Featured Properties
                            </h2>
                            <p className="text-base">
                                Handpicked properties by our team.
                            </p>
                        </div>
                        <Splide
                            className="mb-10"
                            hasTrack={false}
                            options={{
                                mediaQuery: "max",
                                perPage: 3,
                                gap: "1.5rem",
                                flickPower: 100,
                                arrows: false,
                                pagination: false,
                                breakpoints: {
                                    1024: {
                                        perPage: 2,
                                        gap: "1.5rem",
                                    },
                                    768:
                                        properties.length === 1
                                            ? {
                                                  gap: "1rem",
                                                  perPage: 1,
                                              }
                                            : {
                                                  gap: "1rem",
                                                  fixedWidth: "16rem",
                                                  focus: "center",
                                              },
                                },
                            }}
                        >
                            <SplideTrack>
                                {properties?.map((property, i) => (
                                    <SplideSlide key={i}>
                                        <FeaturedPropertyCard
                                            property={property}
                                        />
                                    </SplideSlide>
                                ))}
                            </SplideTrack>
                        </Splide>
                    </div>
                </section>
            )}

            <section
                id="why-choose-us"
                className="flex justify-center items-center bg-white"
            >
                <div className="container">
                    <div className="flex flex-col justify-center items-center gap-y-2 my-10">
                        <h2 className="text-3xl font-bold">Why Choose Us</h2>
                        <p className="text-base">
                            We provide full service at every step.
                        </p>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center text-center mb-10">
                        <div className="flex p-10 flex-col justify-center items-center">
                            <div className="flex justify-center items-center bg-gradient-to-tl from-[rgb(152,2,5)] to-[rgb(173,0,63)] rounded-full w-[110px] h-[110px]">
                                <VscWorkspaceTrusted
                                    color="white"
                                    fontSize="40px"
                                />
                            </div>
                            <div className="flex flex-col items-center gap-y-2 mt-10">
                                <h4 className="text-lg font-semibold">
                                    Trusted By Thousands
                                </h4>
                                <p className="text-sm">
                                    Our comprehensive database of listings and
                                    market info give the most accurate view of
                                    the market and your home value.
                                </p>
                            </div>
                        </div>
                        <div className="flex p-10 flex-col justify-center items-center">
                            <div className="flex justify-center items-center bg-gradient-to-tl from-[rgb(152,2,5)] to-[rgb(173,0,63)] rounded-full w-[110px] h-[110px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-10 h-10 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col items-center gap-y-2 mt-10">
                                <h4 className="text-lg font-semibold">
                                    Wide Renge Of Properties
                                </h4>
                                <p className="text-sm">
                                    Discover a place you’ll love to live in.
                                    Choose from our vast inventory and choose
                                    your desired house.
                                </p>
                            </div>
                        </div>
                        <div className="flex p-10 flex-col justify-center items-center">
                            <div className="flex justify-center items-center bg-gradient-to-tl from-[rgb(152,2,5)] to-[rgb(173,0,63)] rounded-full w-[110px] h-[110px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col items-center gap-y-2 mt-10">
                                <h4 className="text-lg font-semibold">
                                    Financing Made Easy
                                </h4>
                                <p className="text-sm">
                                    Rest guaranteed that your agent and their
                                    expert team are handling every detail of
                                    your transaction from start to end.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <section
                id="why-choose-us"
                className="flex justify-center items-center"
            >
                <div className="container">
                    <div className="flex flex-col justify-center items-center gap-y-2 my-10">
                        <h2 className="text-3xl font-bold">Why Choose Us</h2>
                        <p className="text-base">
                            We provide full service at every step.
                        </p>
                    </div>
                </div>
            </section> */}
        </Layout>
    );
}
