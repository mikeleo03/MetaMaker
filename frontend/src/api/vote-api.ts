import axios from "axios";

import { API_URL_LOCAL } from "@/constant";
import { AssetResponse } from "@/types";

class VoteApi {
    private static axios = axios.create({
        baseURL: import.meta.env.VITE_API_URL || API_URL_LOCAL,
    });

    static async all(): Promise<AssetResponse[]> {
        try {
            const response = await this.axios.get<AssetResponse[]>("/assets");
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default VoteApi;