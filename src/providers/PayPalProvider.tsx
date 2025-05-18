"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const paypalInitialOptions = {
    clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
    currency: "USD",
    intent: "capture",
};

const PayPalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <PayPalScriptProvider options={paypalInitialOptions}>
            {children}
        </PayPalScriptProvider>
    );
};

export default PayPalProvider;