import Image from "next/image";
import Link from "next/link";

const FeaturedPropertyCard = ({ property }) => {
    return (
        <Link href={`/properties/${property._id}`}>
            <div className="w-full bg-white border rounded-lg overflow-hidden shadow-md">
                <div className="w-full aspect-[16/9] relative flex items-center">
                    <div className="absolute z-[1] right-0 bottom-0 left-0 w-full h-[50%] overflow-hidden bg-gradient-to-t from-black/70 to-white/0 opacity-100" />
                    <Image
                        alt="property-image"
                        src={property.images[0]?.url || `https://dummyimage.com/261x261`}
                        draggable="false"
                        fill
                        className="select-none object-cover"
                    />
                    <div className="flex absolute top-3 right-3 gap-x-2 z-[1]">
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
                </div>
                <div className="p-4 bg-white">
                    <h1
                        className="text-xl font-medium overflow-hidden mb-2 h-[56px]"
                        style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {property?.name}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {property.address.district}
                        {", "}
                        {property.address.province}
                    </p>
                    <div className="flex flex-row items-center mt-4 gap-4 divide-x">
                        <div className="text-base">
                            <span className="mr-1">
                                {property.details?.beds}
                            </span>
                            Bed
                        </div>
                        <div className="text-base pl-4">
                            <span className="mr-1">
                                {property.details?.baths}
                            </span>
                            Bath
                        </div>
                        <div className="text-base pl-4">
                            <span className="mr-1">
                                {property.details?.areaSqM}
                            </span>
                            sqm
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default FeaturedPropertyCard;
