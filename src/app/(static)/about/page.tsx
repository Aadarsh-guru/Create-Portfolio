import { Metadata } from "next";

export const metadata: Metadata = {
    title: `About - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
    keywords: process.env.NEXT_PUBLIC_APP_KEYWORDS as string,
};

const AboutPage = () => {

    const appName = process.env.NEXT_PUBLIC_APP_NAME as string;

    return (
        <div className="w-full min-h-screen">
            <section className="w-full py-12">
                <div className="container flex flex-col items-center justify-center space-y-4 px-4 text-center md:space-y-10 md:px-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-sky-600">Welcome to {appName}</h1>
                        <p className="mx-auto max-w-2xl text-sky-500 md:text-xl/relaxed">
                            Empowering Creativity, One Portfolio at a Time
                        </p>
                    </div>
                    <div className="mx-auto max-w-3xl space-y-4">
                        <p>
                            Your portfolio is more than just a collection of your work. It&apos;s your digital footprint, your online identity,
                            and your gateway to new opportunities. At {appName}, we understand the importance of having a stunning and
                            impactful portfolio that truly reflects your unique talents and abilities.
                        </p>
                        <p>
                            Our mission is simple: to provide creatives like you with the tools and resources you need to showcase
                            your work in the best possible light. Whether you&apos;re a software developer, artist, photographer, designer,
                            or any other type of creative professional, our platform is designed to help you build a portfolio that
                            stands out from the crowd.
                        </p>
                        <p>
                            With a wide range of beautiful and modern designs to choose from, customizable templates, and an intuitive
                            drag-and-drop editor, creating your portfolio website has never been easier. Showcase your projects,
                            highlight your skills, and tell your story in a visually compelling way that captivates your audience
                            and leaves a lasting impression.
                        </p>
                        <p>
                            But {appName} is more than just a platform for building portfolios. It&apos;s a community of like-minded
                            individuals who share a passion for creativity and innovation. Connect with other creatives, share
                            your work, and collaborate on projects that inspire you.
                        </p>
                        <p>
                            Join thousands of creatives who have already chosen {appName} as their go-to platform for showcasing
                            their talent and building their online presence. Whether you&apos;re just starting your career or looking
                            to take it to the next level, {appName} is here to support you every step of the way.
                        </p>
                        <p>
                            So why wait? Sign up for {appName} today and unlock the full potential of your portfolio. Let your
                            creativity shine and take your online presence to new heights.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
