import { CheckCircleIcon } from "lucide-react";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import PaymentButton from '@/components/shared/PaymentButton';

const PremiumCard = ({ price }: { price: number }) => {

    return (
        <Card className="w-full max-w-md mx-auto mt-28 shadow-lg border-sky-500" >
            <CardHeader>
                <CardTitle className="flex flex-wrap gap-2 justify-between items-center" >
                    <span>Get Premium</span>
                    <span >₹{price}/year</span>
                </CardTitle>
                <CardDescription>
                    Unlock additional benefits by upgrading to a premium plan. {" "}
                    <span className="text-sky-500" >{
                        (!price || price === 0)
                            ?
                            "It's a limited-time offer. Hurry UP! to avail benefits "
                            :
                            "We offer a 30-day money-back guarantee."
                    }</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" >
                <div className="flex items-center justify-between space-x-4">
                    <p >Custom Domain</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Auto asign SSL</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Custom Logo</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Custom Favicon</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Priority Support</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Dark Mode</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between space-x-4">
                    <p >Server Side Caching</p>
                    <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
            </CardContent>
            <CardFooter className="w-full">
                <PaymentButton
                    className="w-full transition-all bg-sky-500 hover:bg-sky-600 text-white"
                    text={`Upgrade for premium`}
                />
            </CardFooter>
        </Card>
    );
};

export default PremiumCard;