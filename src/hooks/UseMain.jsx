import { useContext } from "react"
import MainContext from "../Context/MainContext"

export const useMain = () => {
    return useContext(MainContext);
};