import {
    Html,
    Body,
    Head,
    render,
    Tailwind,
} from '@react-email/components';

interface ContactTemplateProps {
    email: string;
    name: string;
    message: string;
};

const ContactTemplate: React.FC<ContactTemplateProps> = ({
    email,
    name,
    message,
}) => {
    return (
        <Html lang="en">
            <Head>
                <title>Contact form submission</title>
            </Head>
            <Tailwind>
                <Body>
                    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
                        <div className="max-w-xl mx-auto p-8 bg-white shadow-lg rounded-lg text-center">
                            <h1 className="text-3xl font-semibold text-sky-600 mb-4">Message from Contact Form</h1>
                            <div className="text-left text-gray-700 mb-6">
                                <p className="mb-2"><span className="font-semibold">Name:</span> {name}</p>
                                <p className="mb-2"><span className="font-semibold">Email:</span> {email}</p>
                                <p className="mb-2"><span className="font-semibold">Message:</span> {message}</p>
                            </div>
                        </div>
                    </div>
                </Body>
            </Tailwind>
        </Html>
    );
};

export const ContactTemplateHTML = (props: ContactTemplateProps) => {
    return render(<ContactTemplate {...props} />);
};

export default ContactTemplate;