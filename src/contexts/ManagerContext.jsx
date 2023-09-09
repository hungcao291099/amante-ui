import {createContext, useEffect} from "react";
import {useLocation} from "react-router";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";

export const ManagerContext = createContext({})

export const ManagerProvider = ({ children }) => {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const cookies = new Cookies();
    const managerToken = cookies.get("manager_acs_tk");

    useEffect(() => {
        if(pathname.includes("manager") && pathname !== "/manager/login") {
            if(!managerToken) {
                navigate("/manager/login")
            }
        }
    }, [pathname])

    return (
        <ManagerContext.Provider value={{ }}>
            {children}
        </ManagerContext.Provider>
    )
}