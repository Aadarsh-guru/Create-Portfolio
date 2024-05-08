import { Metadata } from "next";

export const metadata: Metadata = {
    title: `Privacy Policy - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
};

const PrivacyPolicyPage = () => {

    const appName = process.env.NEXT_PUBLIC_APP_NAME as string;
    const mailId = process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID as string;

    return (
        <div className="w-full min-h-screen">
            <section className="w-full py-12">
                <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:space-y-10 md:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-sky-600">Privacy Policy</h1>
                        <p className="mx-auto max-w-2xl text-sky-500">
                            At {appName}, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you use our platform to create and showcase your portfolio website.
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-4">
                        <p>
                            When you sign up for {appName}, we collect certain personal information to provide you with our services. This information may include:
                            <br />- Name
                            <br />- Email address
                            <br />- Username
                            <br />- Profile picture
                        </p>
                        <p>
                            We use the information we collect for various purposes, including:
                            <br />- Creating and maintaining your portfolio website
                            <br />- Communicating with you about your account and our services
                            <br />- Improving our platform and developing new features
                            <br />- Preventing fraud and ensuring platform security
                        </p>
                        <p>
                            We take the security of your data seriously and employ industry-standard measures to protect it from unauthorized access, disclosure, alteration, or destruction. These measures include encryption, firewalls, and regular security audits.
                        </p>
                        <p>
                            {appName} uses cookies to enhance your browsing experience and provide personalized content. You can choose to disable cookies in your browser settings, but please note that some features of our platform may not function properly as a result.
                        </p>
                        <p>
                            Our platform may contain links to third-party websites or services that are not owned or controlled by {appName}. We are not responsible for the privacy practices or content of these third parties and encourage you to review their privacy policies before providing any personal information.
                        </p>
                        <p>
                            {appName} is not intended for use by individuals under the age of 13. We do not knowingly collect or solicit personal information from children, and if we become aware that we have inadvertently collected such information, we will promptly delete it from our records.
                        </p>
                        <p>
                            We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will notify you of any material changes by posting the updated policy on our website or through other means of communication.
                        </p>
                        <p>
                            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at <a href={`mailto:${mailId}`} className="text-sky-500 hover:underline">{mailId}</a>.
                        </p>
                        <p>
                            By using {appName}, you consent to the collection and use of your information as described in this Privacy Policy.
                        </p>
                        <p>
                            **Refund Policy**
                            <br />
                            We offer a 30-day money-back guarantee for our premium plan. If you are not satisfied with our premium services for any reason, you may request a refund within 30 days of your initial purchase. Please contact us at <a href={`mailto:${mailId}`} className="text-sky-500 hover:underline">{mailId}</a> to initiate the refund process.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyPage;
