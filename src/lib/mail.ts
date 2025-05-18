import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

// Initialize the SES client
const sesClient = new SESClient({
    region: process.env.REGION as string,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY as string,
        secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
    },
});

interface ISendMail {
    from?: string;
    to: string;
    subject: string;
    html: string;
};

const fromEmail = `CreatePortfolio <noreply@${process.env.NEXT_PUBLIC_ROOT_DOMAIN}>`;

const sendMail = async ({ from, to, subject, html }: ISendMail) => {
    try {
        const params = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: {
                        Data: html,
                    },
                },
                Subject: { Data: subject },
            },
            Source: from || fromEmail,
        };
        const command = new SendEmailCommand(params);
        return await sesClient.send(command);
    } catch (error) {
        throw error;
    };
};

export default sendMail;