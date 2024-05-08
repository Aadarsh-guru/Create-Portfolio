import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
    Card,
} from "@/components/ui/card";
import PaymentButton from '@/components/shared/PaymentButton';

const RenewPremiumCard = ({ price }: { price: number }) => {

    return (
        <Card className="w-full max-w-md mx-auto mt-28 shadow-lg border-sky-500" >
            <CardHeader>
                <CardTitle className="flex flex-wrap gap-2 justify-between items-center" >
                    <span>Renew premium</span>
                    <span >₹{price}/year</span>
                </CardTitle>
                <CardDescription>Your premium subscription is expired. Please renew your premium subscription to continue using all the premium services.</CardDescription>
            </CardHeader>
            <CardFooter className="w-full">
                <PaymentButton
                    className="w-full transition-all bg-sky-500 hover:bg-sky-600 text-white"
                    text={`Renew premium`}
                />
            </CardFooter>
        </Card>
    );
};

export default RenewPremiumCard;