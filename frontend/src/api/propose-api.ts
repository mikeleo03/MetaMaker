import axios from "axios";

import { API_URL_LOCAL } from "@/constant";

class ProposeApi {
    private static axios = axios.create({
        baseURL: import.meta.env.VITE_API_URL || API_URL_LOCAL,
    });

    static async add(payload: FormData): Promise<any> {
        try {
            const response = await this.axios.post("/upload", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ProposeApi;