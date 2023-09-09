import axios from "axios"
import { baseURL } from "../utils/constants"
import { getCookie } from "../utils/functions"

export const instance = axios.create({
    baseURL: baseURL,
    headers: {
        "Authorization": window.location.href.includes("/manager") ? `Bearer ${getCookie("amante-acs-tk")}` : ""
    }
})