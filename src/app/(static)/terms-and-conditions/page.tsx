import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: `Terms & Conditions - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
    robots: {
        index: true,
        follow: true,
    },
};

const TermsAndConditionsPage = () => {

    const appName = process.env.NEXT_PUBLIC_APP_NAME as string;
    const mailId = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID as string;

    return (
        <div className="w-full min-h-screen">
            <section className="w-full py-12">
                <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:space-y-10 md:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-sky-600">Terms and Conditions</h1>
                        <p className="mx-auto max-w-2xl text-sky-500 md:text-xl/relaxed">
                            Welcome to {appName}. By accessing and using our platform, you agree to comply with these Terms and Conditions.
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-4">
                        <p>
                            <strong>1. Use of Our Platform</strong>
                            <br />
                            - You must be at least 13 years old to use our platform.
                            <br />
                            - You are responsible for maintaining the confidentiality of your account credentials.
                            <br />
                            - You agree to use our platform for lawful purposes only and not to violate any laws or regulations.
                        </p>
                        <p>
                            <strong>2. User Content</strong>
                            <br />
                            - You retain ownership of any content you upload or post on our platform.
                            <br />
                            - By posting content, you grant us a non-exclusive, royalty-free license to use, reproduce, and distribute your content.
                        </p>
                        <p>
                            <strong>3. Intellectual Property</strong>
                            <br />
                            - All content on our platform, including but not limited to text, graphics, logos, and images, is the property of {appName} or its licensors and is protected by copyright laws.
                            <br />
                            - You may not reproduce, modify, or distribute any content from our platform without our prior written consent.
                        </p>
                        <p>
                            <strong>4. Disclaimer</strong>
                            <br />
                            - We make no warranties or representations about the accuracy or completeness of the content on our platform.
                            <br />
                            - Your use of our platform is at your own risk. We are not liable for any damages or losses arising from your use of our platform.
                        </p>
                        <p>
                            <strong>5. Refund Policy</strong>
                            <br />
                            We offer a 30-day money-back guarantee for our premium plan. If you are not satisfied with our premium services for any reason, you may request a refund within 30 days of your initial purchase. Please contact us at <Link href={`mailto:${mailId}`} className="text-sky-500 hover:underline">{mailId}</Link> to initiate the refund process.
                        </p>
                        <p>
                            <strong>6. Changes to These Terms and Conditions</strong>
                            <br />
                            - We reserve the right to update or modify these Terms and Conditions at any time without prior notice.
                            <br />
                            - By continuing to use our platform after any changes, you agree to be bound by the updated Terms and Conditions.
                        </p>
                        <p>
                            If you have any questions or concerns about these Terms and Conditions, please contact us at <Link href={`mailto:${mailId}`} className="text-sky-500 hover:underline">{mailId}</Link>.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TermsAndConditionsPage;