import { useRouter } from "next/router";
import { useState } from "react";
import Select from "./select-dropdown";

const categoryOptions = [
    { label: "All", value: "" },
    { label: "House", value: "House" },
    { label: "Town House", value: "Town House" },
    { label: "Condo", value: "Condo" },
    { label: "Land", value: "Land" },
];

const SearchBox = () => {
    const router = useRouter();

    const [status, setStatus] = useState("Sale");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState(categoryOptions[0]);

    const handleSearch = (e) => {
        e.preventDefault();

        router.push({
            pathname: "/properties",
            query: { location: location, status: status },
        });
    };

    return (
        <>
            <div className="w-2/3 md:w-1/3 mx-auto grid grid-cols-2 space-x-2 rounded-lg p-1 bg-white/80 backdrop-blur-sm mb-4">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="sale"
                        value="Sale"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Sale"}
                    />
                    <label
                        htmlFor="sale"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-primary peer-checked:font-semibold peer-checked:text-white"
                    >
                        Sale
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="rent"
                        value="Rent"
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === "Rent"}
                    />
                    <label
                        htmlFor="rent"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-primary peer-checked:font-semibold peer-checked:text-white"
                    >
                        Rent
                    </label>
                </div>
            </div>

            <div className="relative w-full">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none z-10">
                    <svg
                        className="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search by location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 pr-24 p-3 block w-full rounded-md border focus:outline-none bg-white/80 backdrop-blur-sm border-gray-300 focus:border-blue-600 shadow-sm text-base"
                />
                <button
                    onClick={handleSearch}
                    className="absolute right-1.5 bottom-1.5 top-1.5 inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
                >
                    <div className="w-full h-full inline-flex items-center justify-center font-medium text-white hover:backdrop-brightness-95 py-2 px-4">
                        <span className="block">Search</span>
                    </div>
                </button>
            </div>
        </>
    );
};

export default SearchBox;
