import Link from "next/link";

const DashboardNavbar = () => {
    return (
        <div className="block w-full py-3 border-b overflow-x-scroll md:overflow-x-visible">
            <div className="flex items-center justify-start w-fit md:w-full md:max-w-[1150px] px-5 mx-auto divide-x gap-4 font-normal">
                <div className="flex flex-row gap-4">
                    <Link href={`/dashboard`} className="hover:text-primary">
                        Overview
                    </Link>
                </div>
                <div className="flex flex-row pl-4 gap-4">
                    <Link href={`/dashboard/properties`} className="hover:text-primary">
                        Properties
                    </Link>
                    <Link href={`/dashboard/users`} className="hover:text-primary">
                        Users
                    </Link>
                    <Link href={`/dashboard/messages`} className="hover:text-primary">
                        Messages
                    </Link>
                </div>
                <div className="flex flex-row pl-4 gap-4">
                    <Link href={`/dashboard/configs`} className="hover:text-primary">
                        Configs
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
