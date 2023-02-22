import Layout from "@/components/layouts/layout";
import ListPropertyCard from "@/components/ui/cards/list-property-card";
import FilterForm from "@/components/ui/filter-form";
import LoadingSpiner from "@/components/ui/spiner";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const PropertiesPage = () => {
    const router = useRouter();
    const status = router.query.status;

    const [properties, setProperties] = useState([]);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    const [link, setLink] = useState(
        `/api/properties${status ? `?type=${status}` : ""}`
    );

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
    }, [link]);

    return (
        <Layout>
            <Head>
                <title>Explore - Find CM Property</title>
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="container">
                    {loading ? (
                        <LoadingSpiner />
                    ) : (
                        <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1 mb-4 md:mb-0">
                                <div className="flex flex-col gap-1.5 p-4 md:sticky md:top-[20px] bg-white border shadow rounded-md">
                                    <FilterForm setLink={setLink} />
                                </div>
                            </div>
                            <div className="md:col-span-2 flex flex-col gap-4">
                                <div className="flex justify-between border rounded-md p-4">
                                    <div>
                                        <span className="text-primary font-semibold">
                                            {data.filteredPropertiesCount}
                                        </span>{" "}
                                        Search results
                                    </div>
                                </div>
                                <div className="flex flex-col gap-4">
                                    {properties.length !== 0 ? (
                                        properties.map((property, i) => (
                                            <ListPropertyCard
                                                key={i}
                                                property={property}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center">
                                            Property not found.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default PropertiesPage;
