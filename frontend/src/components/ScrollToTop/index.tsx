import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
    children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Smooth scroll to the top
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return <>{children}</>;
};

export default ScrollToTop;