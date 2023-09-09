import { createContext, useState, useEffect, useContext } from "react";
import { WriteContext } from "./WriteContext";

export const RoomDetailContext = createContext({})

export const RoomDetailProvider = ({ children }) => {
    const { setData, data } = useContext(WriteContext)
    const exists = JSON.parse(window.localStorage.getItem("project_write"))

    
    const initData = []

    const [view, setView] = useState(exists.view ? exists.view : initData)

    useEffect(() => {
        const json = JSON.parse(window.localStorage.getItem("project_write"))
        setData({ ...json, view: view })
    }, [view])

    return (
        <RoomDetailContext.Provider value={{ setView, view }}>
            {children}
        </RoomDetailContext.Provider>
    )
}