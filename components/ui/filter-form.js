import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Select from "./select-dropdown";

const typeOptions = [
    { label: "All", value: "" },
    { label: "House", value: "House" },
    { label: "Town House", value: "Town House" },
    { label: "Condo", value: "Condo" },
    { label: "Land", value: "Land" },
];

const sortOptions = [
    { label: "Latest", value: "latest" },
    { label: "Oldest", value: "oldest" },
    { label: "Highest Price", value: "highestPrice" },
    { label: "Lowest Price", value: "lowestPrice" },
];

const FilterForm = ({ setLink }) => {
    const router = useRouter();

    const [keyword, setKeyword] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState(
        router.query.status ? router.query.status : ""
    );
    const [type, setType] = useState(typeOptions[0]);
    const [sort, setSort] = useState(sortOptions[0]);

    // Debounce
    useEffect(() => {
        const debounce = setTimeout(() => {
            const newLink = `/api/properties?isActive=true&keyword=${keyword}${
                location && `&location=${location}`
            }${status && `&type=${status}`}${
                type.value && `&category=${type.value}`
            }&sort=${sort.value}`;

            setLink(newLink);
        }, 500);

        return () => clearTimeout(debounce);
    }, [keyword, location, setLink, sort, status, type]);

    return (
        <form autoComplete="off" className="w-full grid grid-cols-3 gap-4">
            <div className="col-span-3">
                <input
                    type="text"
                    placeholder="Search"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-3">
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="mt-1 p-2 block w-full rounded-md border focus:outline-none border-gray-300 focus:border-blue-600 shadow-sm md:text-base"
                />
            </div>
            <div className="col-span-3">
                <Select
                    placeholder="Property type"
                    options={typeOptions}
                    selected={type}
                    setSelected={setType}
                />
            </div>
            <div className="col-span-3 grid grid-cols-3 space-x-2 rounded-lg p-1 bg-gray-200">
                <div>
                    <input
                        type="radio"
                        name="option"
                        id="all"
                        value=""
                        className="peer hidden"
                        onChange={(e) => setStatus(e.target.value)}
                        checked={status === ""}
                    />
                    <label
                        htmlFor="all"
                        className="block cursor-pointer select-none rounded-lg p-1.5 text-center peer-checked:bg-primary peer-checked:font-semibold peer-checked:text-white"
                    >
                        All
                    </label>
                </div>
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
            <div className="col-span-3">
                <Select
                    placeholder="Sort by"
                    options={sortOptions}
                    selected={sort}
                    setSelected={setSort}
                />
            </div>
        </form>
    );
};

export default FilterForm;
