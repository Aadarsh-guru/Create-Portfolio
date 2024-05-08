"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, ExternalLink, Loader, RefreshCw, XCircle, } from "lucide-react";
import { DomainResponse, DomainVerificationStatusProps } from "@/lib/types";
import { verifyDomainAction } from "@/actions/domain";
import { getSubdomain } from "@/lib/domain";
import { Button } from "@/components/ui/button";
import TooltipContainer from "@/components/shared/TooltipContainer";
import { cn } from "@/lib/utils";

function DomainConfiguration({ domain }: { domain: string }) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [initialLoading, setInitialLoading] = useState<boolean>(false);
    const [recordType, setRecordType] = useState<"A" | "CNAME">("A");
    const [status, setStatus] = useState<DomainVerificationStatusProps>();
    const [domainJson, setDomainJson] = useState<DomainResponse & { error: { code: string; message: string } }>();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await verifyDomainAction(domain);
            if (response.status) {
                setStatus(response.status);
                setDomainJson(response.domainJson);
                setTimeout(() => setIsLoading(false), 1000);
            }
        } catch (error) {
            setIsLoading(false)
            throw error;
        }
    };

    useEffect(() => {
        setInitialLoading(true);
        fetchData().finally(() => {
            setInitialLoading(false);
        });
    }, []);

    if (initialLoading) {
        return (
            <div className="w-full flex items-center justify-center px-4">
                <Loader className="h-5 w-5 animate-spin duration-1000" />
            </div>
        );
    };

    if (!status || !domainJson) return null;

    if (status === "Valid Configuration" && !isLoading) {
        return (
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <p className="text-sm">Configration successful.</p>
                </div>
                <Link
                    href={`https://${domain}`}
                    target="_blank"
                    className="flex items-center gap-1 transition-all text-sky-600 hover:underline hover:text-sky-700"
                >
                    <p className="text-sm" >visit</p>
                    <ExternalLink className="h-4 w-4 " />
                </Link>
            </div>
        );
    };

    const subdomain = getSubdomain(domainJson.name, domainJson.apexName);

    const txtVerification = (status === "Pending Verification" && domainJson.verification.find((x: any) => x.type === "TXT")) || null;

    return (
        <div>
            <div className="mb-4 flex items-center justify-between space-x-2">
                <div className="flex gap-1 items-center">
                    {status === "Pending Verification" ? (
                        <AlertCircle
                            fill="#FBBF24"
                            stroke="currentColor"
                            className="text-white dark:text-black"
                        />
                    ) : (
                        <XCircle
                            fill="#DC2626"
                            stroke="currentColor"
                            className="text-white dark:text-black"
                        />
                    )}
                    <p className="text-sm md:text-lg font-semibold dark:text-white">{status}</p>
                </div>
                <TooltipContainer content="Refresh" >
                    <Button
                        onClick={fetchData}
                        disabled={isLoading}
                        variant={'outline'}
                        size={'icon'}
                    >
                        <RefreshCw className={cn(
                            "h-5 w-5 text-sky-700",
                            isLoading && "animate-spin cursor-not-allowed",
                        )} />
                    </Button>
                </TooltipContainer>
            </div>
            {txtVerification ? (
                <>
                    <p className="text-sm dark:text-white">
                        Please set the following TXT record on{" "}
                        <span className="text-sky-500" >{domainJson.apexName}</span> to prove
                        ownership of <span className="text-sky-500" >{domainJson.name}</span>
                    </p>
                    <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
                        <div>
                            <p className="text-sm font-bold">Type</p>
                            <p className="mt-2 font-mono text-sm">{txtVerification.type}</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Name</p>
                            <p className="mt-2 font-mono text-sm">
                                {txtVerification.domain.slice(
                                    0,
                                    txtVerification.domain.length -
                                    domainJson.apexName.length -
                                    1,
                                )}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-bold">Value</p>
                            <p className="mt-2 font-mono text-sm">
                                <span className="text-ellipsis">{txtVerification.value}</span>
                            </p>
                        </div>
                    </div>
                    <p className="text-sm dark:text-stone-400">
                        Warning: if you are using this domain for another site, setting this
                        TXT record will transfer domain ownership away from that site and
                        break it. Please exercise caution when setting this record.
                    </p>
                </>
            ) : status === "Unknown Error" ? (
                <p className="mb-5 text-sm dark:text-white">
                    {domainJson.error.message}
                </p>
            ) : (
                <>
                    <div className="flex justify-start space-x-4">
                        <button
                            type="button"
                            onClick={() => setRecordType("A")}
                            className={`${recordType == "A"
                                ? "border-black text-black dark:border-white dark:text-white"
                                : "border-white text-stone-400 dark:border-black dark:text-stone-600"
                                } ease border-b-2 pb-1 text-sm transition-all duration-150`}
                        >
                            A Record{!subdomain && " (recommended)"}
                        </button>
                        <button
                            type="button"
                            onClick={() => setRecordType("CNAME")}
                            className={`${recordType == "CNAME"
                                ? "border-black text-black dark:border-white dark:text-white"
                                : "border-white text-stone-400 dark:border-black dark:text-stone-600"
                                } ease border-b-2 pb-1 text-sm transition-all duration-150`}
                        >
                            CNAME Record{subdomain && " (recommended)"}
                        </button>
                    </div>
                    <div className="my-3 text-left">
                        <p className="my-5 text-sm dark:text-white">
                            To configure your{" "}
                            {recordType === "A" ? "apex domain" : "subdomain"} (
                            <span className="text-sky-500" >
                                {recordType === "A" ? domainJson.apexName : domainJson.name}
                            </span>
                            ), set the following {recordType} record on your DNS provider to
                            continue:
                        </p>
                        <div className="flex items-center justify-start space-x-10 overflow-x-auto rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
                            <div>
                                <p className="text-sm font-bold">Type</p>
                                <p className="mt-2 font-mono text-sm">{recordType}</p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Name</p>
                                <p className="mt-2 font-mono text-sm">
                                    {recordType === "A" ? "@" : subdomain ?? "www"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">Value</p>
                                <p className="mt-2 font-mono text-sm">
                                    {recordType === "A"
                                        ? `76.76.21.21`
                                        : `cname.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-bold">TTL</p>
                                <p className="mt-2 font-mono text-sm">86400</p>
                            </div>
                        </div>
                        <p className="mt-5 text-sm dark:text-white">
                            Note: for TTL, if <span className="text-sky-500" >86400</span> is not
                            available, set the highest value possible. Also, domain
                            propagation can take up to an hour.
                        </p>
                    </div>
                </>
            )}
        </div>
    );
};

export default DomainConfiguration;