import axios from "axios";
import { useState } from "react";
// import refreshSession from "../../../utils/refresh-session";
import Select from "../select-dropdown";
import ModalLayout from "./modal-layout";

const UpdateUserModal = ({ user, setIsOpen, setIsUpdated, setError }) => {
    const list = [
        { label: "admin", value: "admin" },
        { label: "user", value: "user" },
    ];

    const initialRole = list.find((item) => item.value === user?.role) || {};

    const [role, setRole] = useState(initialRole);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const config = { headers: { "Content-Type": "application/json" } };

        try {
            const { data } = await axios.put(
                `/api/admin/users/${user?._id}`,
                {
                    role: role.value,
                },
                config
            );

            // await refreshSession();

            setIsUpdated(data.success);
        } catch (error) {
            setError(error.message);
            console.error(error.message);
        }

        setIsOpen(false);
    };

    return (
        <ModalLayout>
            <div className="w-full px-6 py-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">จัดการผู้ใช้</h2>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center font-medium text-black py-2 rounded-md transition-all hover:scale-125"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <form
                autoComplete="off"
                className="px-6 py-6 w-[95vw] md:w-[35rem] grid grid-cols-2 gap-6"
            >
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        Username
                    </label>
                    <input
                        value={user?.username}
                        disabled
                        className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-bold tracking-wide">
                        Email
                    </label>
                    <input
                        value={user?.email}
                        disabled
                        className="mt-1 p-2 block w-full bg-gray-100 rounded-md border focus:outline-none border-gray-300 shadow-sm md:text-base"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm mb-1 font-bold tracking-wide">
                        Role
                    </label>
                    <Select
                        placeholder="Select role"
                        options={list}
                        selected={role}
                        setSelected={setRole}
                    />
                </div>
            </form>
            <div className="w-full px-6 py-4 flex items-center justify-end gap-x-4">
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center font-medium border hover:bg-gray-100/80 py-2 px-2 md:px-4 rounded-md transition-all"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-5 h-5 mr-2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="block">Cancel</span>
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-flex items-center bg-primary rounded-md transition-all overflow-hidden"
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
                        <span className="block">Update</span>
                    </div>
                </button>
            </div>
        </ModalLayout>
    );
};

export default UpdateUserModal;
