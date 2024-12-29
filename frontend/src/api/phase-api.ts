import axios from "axios";

import { API_URL_LOCAL } from "@/constant";

class PhaseApi {
    private static axios = axios.create({
        baseURL: import.meta.env.VITE_API_URL || API_URL_LOCAL,
    });

    static async get(): Promise<{ startTime: string }> {
        try {
            const response = await this.axios.get<{ startTime: string }>("/start-time");
            return response.data;
        } catch (error) {
            throw error;
        }
    }    
}

export default PhaseApi;