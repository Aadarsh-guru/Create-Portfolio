import Image from "next/image";
import prisma from "@/lib/prisma";
import {
  Rocket,
  ArrowRight,
  DollarSign,
  Settings,
  Zap,
  BarChart,
  SunMoon,
  AtSign,
  Server,
  CheckCircleIcon,
  CircleX,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/shared/LoginDialog";
import { cn } from "@/lib/utils";

async function Home() {

  const siteData = await prisma.siteData.findFirst({
    select: {
      premiumPrice: true,
      frontImage: true,
    },
  });

  const appName = process.env.NEXT_PUBLIC_APP_NAME as string;
  const alternativeImageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative px-6 pt-14 lg:px-8">
        <div className="relative mx-auto md:max-w-4xl py-24">
          <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
            <svg
              className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
              viewBox="0 0 1155 678"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                fillOpacity=".3"
                d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
              />
              <defs>
                <linearGradient
                  id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                  x1="1155.49"
                  x2="-78.208"
                  y1=".177"
                  y2="474.645"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8ED5FF" />
                  <stop offset={1} stopColor="#FFF" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:text-6xl">
              Make your <span className="text-sky-500" >presence</span> available to the world.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              {appName} allows you to effortlessly showcase your work to the world. It&apos;s fully responsive, customizable, and easy to set up.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <LoginDialog>
                <button
                  type="button"
                  className="py-4 flex gap-2 px-6 rounded-lg text-white font-bold transition-all bg-sky-500 hover:bg-sky-600 active:scale-[98%]"
                >
                  <span>
                    Get started
                  </span>
                  <ArrowRight />
                </button>
              </LoginDialog>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="rounded-lg bg-gray-200 dark:bg-gray-800 p-4">
            <Image
              width={1000}
              height={500}
              className={cn(
                "aspect-[3/2] w-full rounded-lg bg-gray-50 dark:bg-gray-900 object-cover lg:aspect-auto lg:object-center",
                !siteData?.frontImage && "lg:h-[500px]",
              )}
              src={siteData?.frontImage || alternativeImageUrl}
              alt="Demo image"
            />
          </div>
        </div>
      </div>
      {/* Features Section */}
      <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 md:my-24 lg:my-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200 sm:text-4xl">
            <span className="text-sky-500">{appName}</span> helps you build your portfolio with ease.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            {appName} offers a range of customization options to tailor your portfolio to your needs.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
              <DollarSign className="h-9 w-9 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Free of Charge</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {appName} is completely free to use for all users.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
              <Zap className="h-9 w-9 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Fast & SEO-Friendly</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {appName} offers server-side rendering for faster SEO and better page load speed.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
              <BarChart className="h-9 w-9 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Live Analytics</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              See and monitor your growth in multiple time frames by our live analytics system.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-900">
              <Settings className="h-9 w-9 text-gray-700 dark:text-gray-300" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Easy Setup</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              {appName} is easy to set up, allowing you to focus on showcasing your work.
            </p>
          </div>
        </div>
      </div>
      {/* Premium Features Section */}
      <div className="mx-auto my-12 max-w-7xl px-4 sm:px-6 md:my-24 lg:my-32 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="mt-6 text-3xl font-bold leading-tight text-gray-800 dark:text-gray-200 sm:text-4xl">
            Unlock <span className="text-sky-500" >Premium</span> Features
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-gray-400">
            Upgrade to premium for additional benefits.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-4">
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400">
              <Server className="h-9 w-9 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Custom domain</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Host your portfolio on your custom domain with auto-assigned SSL.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400">
              <AtSign className="h-9 w-9 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Custom Branding</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Add custom logo and favicon to give your viewers a personal touch.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400">
              <SunMoon className="h-9 w-9 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Dark Mode</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Provide better user experience by allowing your viewers to choose from dark and light mode.
            </p>
          </div>
          <div>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-yellow-400">
              <Rocket className="h-9 w-9 text-white" />
            </div>
            <h3 className="mt-8 text-lg font-semibold">Server Side Caching</h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Experience 50% boost in page loading performance with our server-side caching, for optimal user experience.
            </p>
          </div>
        </div>
      </div>
      {/* Pricing */}
      <section className="my-12 py-10 md:my-24 lg:my-32">
        <div className="mx-auto max-w-7xl flex flex-wrap justify-center items-center gap-10">
          <Card className="w-full lg:w-1/3" >
            <CardHeader>
              <CardTitle className="flex flex-wrap gap-2 justify-between items-center" >
                <span>Free</span>
              </CardTitle>
              <CardDescription>Start for free. Enjoy the benefits of our free services with lifetime access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" >
              <div className="flex items-center justify-between space-x-4">
                <p >Lifetime free</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Live analytics</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Email Support</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Priority Support</p>
                <CircleX className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Custom Domain</p>
                <CircleX className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Custom Branding</p>
                <CircleX className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Dark Mode</p>
                <CircleX className="w-5 h-5 text-rose-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Server Side Caching</p>
                <CircleX className="w-5 h-5 text-rose-600" />
              </div>
            </CardContent>
            <CardFooter className="w-full">
              <LoginDialog className="w-full" >
                <Button className="w-full" >
                  Start for free
                </Button>
              </LoginDialog>
            </CardFooter>
          </Card>
          <Card className="w-full lg:w-1/3 shadow-lg border-sky-500" >
            <CardHeader>
              <CardTitle className="flex flex-wrap gap-2 justify-between items-center" >
                <span>Premium</span>
                <span >₹{siteData?.premiumPrice ?? 0}/year</span>
              </CardTitle>
              <CardDescription>
                Access all our premium services for one year. {" "}
                <span className="text-sky-500" >{
                  (!siteData?.premiumPrice || siteData?.premiumPrice === 0)
                    ?
                    "It's a limited-time offer. Sign up now to avail benefits."
                    :
                    "We offer a 30-day money-back guarantee."
                }</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4" >
              <div className="flex items-center justify-between space-x-4">
                <p >Lifetime free</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Live analytics</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Email Support</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Priority Support</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Custom Domain</p>
                <CheckCircleIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center justify-between space-x-4">
                <p >Custom Branding</p>
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
              <LoginDialog className="w-full" >
                <Button className="w-full transition-all bg-sky-500 hover:bg-sky-600 text-white" >
                  Get started.
                </Button>
              </LoginDialog>
            </CardFooter>
          </Card>
        </div>
      </section>
      {/* FAQs */}
      <section className="mx-auto max-w-7xl bg-gray-50 dark:bg-gray-900 px-4 py-10 rounded-lg md:px-0 mb-10">
        <div>
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-2xl font-bold leading-tight text-gray-800 dark:text-gray-200 sm:text-4xl lg:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-600 dark:text-gray-400 lg:mx-auto">
              Have questions about {appName}? Check out our FAQs.
            </p>
          </div>
          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 md:mt-16 md:grid-cols-2">
            {/* Random FAQ Questions and Answers */}
            <div>
              <h2 className="text-xl font-semibold">Is {appName} free to use?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                Yes, {appName} is completely free for all users. in our free plan we don&apos;t limit our users to showcase their work.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">How fast is {appName}?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                {appName} is built on Next.js 14, providing fast server-side rendering for better page load speed and SEO optimization.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Can I customize my portfolio?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                Absolutely! {appName} offers a range of customization options so you can tailor your portfolio according to your preferences.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">How do I get started with {appName}?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                Getting started with {appName} is simple. Just sign up for an account and follow the guided setup process.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">How do I unlock premium features?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                To unlock premium features such as custom domain, logo, favicon and advanced customization options, you&apos;ll have to pay the premium amount. we support all the famous payment methods.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">What if i don&apos;t like premium features?</h2>
              <p className="mt-6 text-sm leading-6 tracking-wide text-gray-500">
                We offer 30 days money back guarantee if you don&apos;t like premium features. Just contact us and we&apos;ll help you out.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;