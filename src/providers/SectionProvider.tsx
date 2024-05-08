"use client";
import { createContext, useContext, useEffect, useState } from "react";

interface ISectionContext {
    activeSection: string;
};

const SectionContext = createContext<ISectionContext>({
    activeSection: "",
});

export const useSection = () => useContext(SectionContext);

const SectionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

    const [activeSection, setActiveSection] = useState<string>("home");

    useEffect(() => {
        const updateActiveSection = () => {
            const sections = document.querySelectorAll('.section');
            let currentActiveSection = '';
            sections.forEach((section) => {
                const { offsetTop, offsetHeight } = section as HTMLElement;
                const halfViewportHeight = window.innerHeight / 2;
                const topBoundary = window.scrollY + halfViewportHeight;
                const bottomBoundary = window.scrollY + halfViewportHeight;
                if (topBoundary >= offsetTop && bottomBoundary <= offsetTop + offsetHeight) {
                    currentActiveSection = section.id;
                }
            });
            setActiveSection(currentActiveSection);
        };
        window.addEventListener('scroll', updateActiveSection);
        return () => {
            window.removeEventListener('scroll', updateActiveSection);
        };
    }, []);

    return (
        <SectionContext.Provider value={{ activeSection }} >
            {children}
        </SectionContext.Provider>
    );
};

export default SectionProvider;