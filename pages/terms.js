import Layout from "@/components/layouts/layout";
import Head from "next/head";

const TermsPage = () => {
    return (
        <Layout>
            <Head>
                <title>Terms of Service - Find CM Property</title>
            </Head>
            <section id="main" className="flex justify-center items-center">
                <div className="max-w-[850px] p-5 mx-auto items-center">
                    <div className="flex flex-col justify-center items-center gap-y-4 my-6">
                        <h2 className="text-4xl font-bold">Terms of Service</h2>
                        <p className="text-base">
                            Last updated on March 5, 2023
                        </p>
                    </div>
                    <div className="flex flex-col justify-center items-start mb-10">
                        <h2 className="text-xl font-bold mt-8">
                            Copyright Policy
                        </h2>
                        <p className="text-sm mt-4">
                            We respect the intellectual property rights of
                            others. It is our policy to respond to any claim
                            that Content posted on the Service infringes the
                            copyright or other intellectual property
                            infringement of any person.
                        </p>
                        <h2 className="text-xl font-bold mt-8">Termination</h2>
                        <p className="text-sm mt-4">
                            We may terminate or suspend your account
                            immediately, without prior notice or liability, for
                            any reason whatsoever, including without limitation
                            if you breach the Terms.
                        </p>
                        <p className="text-sm mt-4">
                            Upon termination, your right to use the Service will
                            immediately cease. If you wish to terminate your
                            account, you may simply discontinue using the
                            Service.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Changes and amendments
                        </h2>
                        <p className="text-sm mt-4">
                            We reserve the right to modify this terms relating
                            to the Website at any time, effective upon posting
                            of an updated version of this terms on the Website.
                            When we do we will revise the updated date at the
                            bottom of this page. Continued use of the Website
                            after any such changes shall constitute your consent
                            to such changes.
                        </p>
                        <h2 className="text-xl font-bold mt-8">
                            Contacting us
                        </h2>
                        <p className="text-sm mt-4">
                            If you have any questions about this Terms of
                            Service, please contact us by email at{" "}
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

export default TermsPage;
