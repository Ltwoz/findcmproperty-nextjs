import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const SidebarContext = createContext();

export const SidebarContextProvider = ({ children }) => {
    const [isMobile, setMobile] = useState(true);
    const [isOpen, setIsOpen] = useState(isMobile ? false : true);

    const resize = () => {
        let currentHideNav = window.innerWidth <= 1280;
        setMobile(currentHideNav);
    };

    useEffect(() => {
        window.addEventListener("resize", resize);
        resize();
        setIsOpen(!isMobile);
    }, [isMobile]);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                setIsOpen,
                isMobile
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
