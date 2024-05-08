import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
    customLogo?: string;
    className?: string;
    borderBotton?: boolean;
};

const Logo: React.FC<LogoProps> = ({ customLogo, className, borderBotton = true }) => {
    return (
        <div className={cn("h-20 w-full flex justify-center items-center", borderBotton && "border-b")}>
            <Link href={'/'} >
                <div className={cn("h-14 w-44 relative bg-transparent", className)}>
                    <Image
                        fill
                        src={customLogo || '/logo.png'}
                        alt='logo'
                        className='object-cover'
                    />
                </div>
            </Link>
        </div>
    );
};

export default Logo;