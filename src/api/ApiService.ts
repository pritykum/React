import axios, {type AxiosInstance} from 'axios';
import {MyUtil} from "../MyUtil.ts";


class ApiService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: MyUtil.getEnvironmentVariable('API_URL'),
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
  
    //   Fetch list of available site names.
     
    async getSiteList(): Promise<string[]> {
        const response = await this.api.get('/sites');
        return response.data.site_list;
    }

 async getConfig(): Promise<{ endpoint_addon: string }> {
    try {
        const res = await this.api.get('/get_config');
        return res.data;
    } catch (error) {
        console.error("Error fetching config:", error);
        throw error;
    }
}


  async getNrToNrAudit(site: string, date: string): Promise<any> {
    const params = new URLSearchParams({
      selected_site: site,
      raml_date: date
    });

    try {
      const response = await this.api.get('/neighborAudit/nrTonr', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching NR-to-NR audit:', error);
      throw error;
    }
  }

  async getLteToLteAudit(site: string, date: string): Promise<any> {
    const params = new URLSearchParams({
      selected_site: site,
      raml_date: date
    });

    try {
      const response = await this.api.get('/neighborAudit/ltetolte', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching LTE-to-LTE audit:', error);
      throw error;
    }
  }

  async getLteToNrAudit(site: string, date: string): Promise<any> {
    const params = new URLSearchParams({
      selected_site: site,
      raml_date: date
    });

    try {
      const response = await this.api.get('/neighborAudit/lteTonr', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching LTE-to-NR audit:', error);
      throw error;
    }
  }
}

export const apiService = new ApiService();
