import { defineStore } from "pinia";
import axios, { type AxiosResponse } from "axios";
import type { SRresponse } from "~/types/response";

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    apikey: "HpGVQO0LXyLItUHKkm2rjmG2AMgDB5XT",
    file: null as File | null,
    SRurl: "",
    caption: null as any,
  }),
  getters: {
    getFileUrl: (state) => (state.file ? URL.createObjectURL(state.file) : ""),
    getSRfileUrl: (state) => {
      if (state.SRurl && state.SRurl.length > 0) {
        axios
          .get(state.SRurl, { headers: { Apikey: state.apikey } })
          .then((response) => {
            let file = new Blob([response.data], { type: "image/png" });
            console.log(URL.createObjectURL(file));
            return URL.createObjectURL(file);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        return "";
      }
    },
  },
  actions: {
    handleFileChange(event: Event) {
      this.file = (<HTMLInputElement>event.target).files?.[0] || null;
    },
    async submitFileCap() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append("file", this.file);

      const headers = {
        Apikey: this.apikey,
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await axios.post<AxiosResponse<{ caption: string }>>(
          "https://api.aiforthai.in.th/capgen",
          formData,
          { headers }
        );
        this.caption = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async submitFileSupResolution() {
      if (!this.file) return;

      const formData = new FormData();
      formData.append("file", this.file);

      const headers = {
        Apikey: this.apikey,
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await axios.post<SRresponse>(
          "https://api.aiforthai.in.th/superresolution/sr",
          formData,
          { headers }
        );
        this.SRurl = response.data.url;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
