import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/property/upscale/679379e84df2ea29133e2140"; // Set your API URL

interface ApiContextType {
    data: any;
    loading: boolean;
    error: string | null;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${API_URL}`) // Change endpoint if needed
            .then((response) => {
                console.log(response);
                setData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return (
        <ApiContext.Provider value={{ data, loading, error }}>
            {children}
        </ApiContext.Provider>
    );
};

export const useApi = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error("useApi must be used within an ApiProvider");
    }
    return context;
};
