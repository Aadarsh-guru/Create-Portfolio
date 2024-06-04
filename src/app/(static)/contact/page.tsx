import { Metadata } from "next";
import ContactForm from "@/components/static/ContactForm";

export const metadata: Metadata = {
    title: `Contact - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
    robots: {
        index: true,
        follow: true,
    },
};

const ContactPage = () => {

    const operationalAddress = process.env.NEXT_PUBLIC_OPERATIONAL_ADDRESS as string;

    return (
        <div className="w-full min-h-screen">
            <div className="mx-auto max-w-lg md:px-4">
                <div className="flex flex-col space-y-5 md:space-y-8 pb-10 pt-12">
                    <h1 className="text-center text-3xl font-bold text-sky-600 md:text-5xl md:leading-10">
                        Get in touch
                    </h1>
                    <p className="mx-auto max-w-4xl text-center text-sm text-sky-800 md:text-base">
                        Whether you have questions, feedback, or just want to say hello, we&apos;re here for you.
                    </p>
                    <ContactForm />
                    <div className="text-center text-sm text-sky-800 md:text-base">
                        <p>
                            <strong>Operational Address:</strong> {operationalAddress}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
