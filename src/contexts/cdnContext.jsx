import { createContext, useState, useEffect } from "react"
import cdn from "@apis/cdn"

export const CdnContext = createContext({})

export const CdnProvider = ({ children }) => {
    const [baseUrl, setBaseUrl] = useState(undefined)
    
    const fetch = async () => {
        const response = await cdn()
        setBaseUrl(response)
    }

    useEffect(() => {
        fetch()
    }, [])

    return (
        <CdnContext.Provider value={{ baseUrl }}>
            {children}
        </CdnContext.Provider>
    )
}