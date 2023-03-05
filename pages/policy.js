import Layout from "@/components/layouts/layout";
import Head from "next/head";

const PolicyPage = () => {
    return (
        <Layout>
            <Head>
                <title>Privacy Policy - Find CM Property</title>
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="max-w-[850px] p-5 mx-auto items-center">
                    <div className="flex flex-col justify-center items-center gap-y-4 my-6">
                        <h2 className="text-4xl font-bold">Privacy Policy</h2>
                        <p className="text-base">
                            Last updated on March 5, 2023
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-start mb-10">
                        <h2 className="text-xl font-bold mt-8">
                            Collection of personal information
                        </h2>
                        <p className="text-sm mt-4">
                            By using the Website, you agree that the Company may
                            collect and process your personal information. The
                            following Privacy Policy governs the collection,
                            processing, and disclosure of your personal
                            information in relation to Find CM Property. We
                            collect your IP address, email address (when logged
                            in), cookie identifiers and website activity. We
                            review data trends and use indicators to help you
                            find relevant properties more easily. You may
                            request deletion of your data at any time by
                            emailing us at Findcmproperty@gmail.com from the
                            related account email address.
                        </p>
                        <h2 className="text-xl font-bold mt-8">Cookies</h2>
                        <p className="text-sm mt-4">
                            The Website uses &quot;cookies&quot; to help
                            personalize your online experience. A cookie is a
                            text file that is placed on your hard disk by a web
                            page server. Cookies cannot be used to run programs
                            or deliver viruses to your computer. Cookies are
                            uniquely assigned to you, and can only be read by a
                            web server in the domain that issued the cookie to
                            you. We may use cookies to collect, store, and track
                            information for statistical purposes to operate our
                            Website. You have the ability to accept or decline
                            cookies. Most web browsers automatically accept
                            cookies, but you can usually modify your browser
                            setting to decline cookies if you prefer.
                        </p>
                        <p className="text-sm mt-4">
                            In addition to using cookies and related
                            technologies as described above, we also may permit
                            certain third-party companies to help us tailor
                            advertising that we think may be of interest to
                            users and to collect and use other data about user
                            activities on the Website. These companies may
                            deliver ads that might also place cookies and
                            otherwise track user behavior.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Links to other websites
                        </h2>
                        <p className="text-sm mt-4">
                            Our Website contains links to other websites that
                            are not owned or controlled by us. Please be aware
                            that we are not responsible for the privacy
                            practices of such other websites or third parties.
                            We encourage you to be aware when you leave our
                            Website and to read the privacy statements of each
                            and every website that may collect Personal
                            Information.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Changes and amendments
                        </h2>
                        <p className="text-sm mt-4">
                            We reserve the right to modify this privacy policy
                            relating to the Website at any time, effective upon
                            posting of an updated version of this Policy on the
                            Website. When we do we will revise the updated date
                            at the bottom of this page. Continued use of the
                            Website after any such changes shall constitute your
                            consent to such changes.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Acceptance of this policy
                        </h2>
                        <p className="text-sm mt-4">
                            You acknowledge that you have read this Policy and
                            agree to all its terms and conditions. By using the
                            Website you agree to be bound by this Policy. If you
                            do not agree to abide by the terms of this Policy,
                            you are not authorized to use or access the Website.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Contacting us
                        </h2>
                        <p className="text-sm mt-4">
                            If you have any questions about this Policy, please
                            contact us by email at{" "}
                            <a
                                href="mailto:Findcmproperty@gmail.com"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Findcmproperty@gmail.com
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PolicyPage;
