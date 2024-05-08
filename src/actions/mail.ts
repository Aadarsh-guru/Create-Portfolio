"use server";
import sendMail from "@/lib/mail";
import { ContactTemplateHTML } from "@/components/emails/ContactTemplate";

const sendContactMailAction = async (values: {
    to: string;
    name: string;
    email: string;
    message: string;
}) => {
    try {
        const html = ContactTemplateHTML(values);
        await sendMail({
            to: values.to,
            subject: "Contact Form Submission",
            html,
        });
        return {
            success: true,
            message: "Message send successfully",
        };
    } catch (error) {
        throw error;
    };
};

export {
    sendContactMailAction,
};