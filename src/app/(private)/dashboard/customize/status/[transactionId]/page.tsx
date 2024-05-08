import {
    CircleCheck,
    CircleAlert,
    CircleX
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/user";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RefreshButton from "@/components/shared/RefreshButton";

const PaymentStatusPage = async ({ params: { transactionId } }: { params: { transactionId: string } }) => {

    const user = await getCurrentUser();
    const isPremiumValid = (user?.isPremiumUser && new Date(user?.premiumExpiry!) > new Date());

    if (isPremiumValid) {
        return redirect(`/dashboard/customize`);
    }

    const merchantId = process.env.PHONEPAY_MERCHANT_ID as string;
    const saltKey = process.env.PHONEPAY_SALT_KEY as string;
    const saltIndex = parseInt(process.env.PHONEPAY_SALT_INDEX as string);

    const dataSha256 = `/pg/v1/status/${merchantId}/${transactionId}` + saltKey;
    const checksum = dataSha256 + "###" + saltIndex;

    const response = await fetch(`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${transactionId}`, {
        method: "GET",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": merchantId,
        },
    });

    const data = await response.json();

    if (data?.code === "PAYMENT_SUCCESS") {
        setTimeout(() => {
            redirect(`/dashboard/customize`);
        }, 5000);
    };

    return (
        <div className="w-full min-h-screen p-6">
            {data?.code === "PAYMENT_SUCCESS" ? (
                <Card className="w-full max-w-md mx-auto mt-28" >
                    <CardHeader>
                        <CardTitle className="text-green-500" >
                            Payment Success
                        </CardTitle>
                        <CardDescription>
                            Your payment was successful.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex justify-center items-center" >
                        <CircleCheck className="h-40 w-40 text-green-500" />
                    </CardContent>
                    <CardFooter className="w-full">
                        <Link className="w-full" href={`/dashboard/customize`} >
                            <Button className="w-full border-green-500 text-green-500 font-semibold" variant={'outline'} >
                                Go back
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ) : data?.code === "PAYMENT_PENDING" ? (
                <Card className="w-full max-w-md mx-auto mt-28" >
                    <CardHeader>
                        <CardTitle className="flex flex-wrap gap-2 justify-between items-center" >
                            <span className="text-yellow-500" >Payment pending</span>
                            <RefreshButton className="text-yellow-500" />
                        </CardTitle>
                        <CardDescription>
                            Your payment is pending
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex justify-center items-center" >
                        <CircleAlert className="h-40 w-40 text-yellow-500" />
                    </CardContent>
                </Card>
            ) : data?.code === "PAYMENT_FAILED" ? (
                <Card className="w-full max-w-md mx-auto mt-28" >
                    <CardHeader>
                        <CardTitle className="text-red-500" >
                            Payment failed
                        </CardTitle>
                        <CardDescription>
                            Your payment has failed. if the amount is deducted it will be refunded soon.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex justify-center items-center" >
                        <CircleX className="h-40 w-40 text-red-500" />
                    </CardContent>
                    <CardFooter className="w-full">
                        <Link className="w-full" href={`/dashboard/customize`} >
                            <Button className="w-full border-red-500 text-red-500 font-semibold" variant={'outline'} >
                                Try again
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            ) : (
                <Card className="w-full max-w-md mx-auto mt-28" >
                    <CardHeader>
                        <CardTitle className="text-red-500" >
                            Something went wrong
                        </CardTitle>
                        <CardDescription>
                            An error occurred while checking the status of your payment. if the amount is deducted it will be refunded soon or your payment will be successful.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 flex justify-center items-center" >
                        <CircleX className="h-40 w-40 text-red-500" />
                    </CardContent>
                    <CardFooter className="w-full">
                        <Link className="w-full" href={`/dashboard/customize`} >
                            <Button className="w-full border-red-500 text-red-500 font-semibold" variant={'outline'} >
                                Try again
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
};

export default PaymentStatusPage;