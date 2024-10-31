import { defineStore } from "pinia";
import axios, { type AxiosResponse } from "axios";
import type { SRresponse } from "~/types/response";

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    apikey: "HpGVQO0LXyLItUHKkm2rjmG2AMgDB5XT",
    file: null as File | null,
    SRurl: "",
    caption: null as any,
    imageSRurl: null as any,
    imageSR: null as File | null,
    isLoading: false,
    detectionResult: null as any,
    heatmapResult: null as any,
  }),
  getters: {
    getFile: (state) => state.file,
    getFileUrl: (state) => (state.file ? URL.createObjectURL(state.file) : ""),
    getSRfile: (state) => state.imageSR,
    getSRfileUrl: (state) => state.imageSRurl,
    getDetectionResult: (s) => s.detectionResult,
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
        console.log(this.SRurl);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchImageWithHeader() {
      if (!this.SRurl) return;

      try {
        const response = await axios.get(this.SRurl, {
          headers: {
            Apikey: this.apikey,
          },
          responseType: "blob",
        });
        this.imageSR = response.data;
        const imageUrl = URL.createObjectURL(response.data);
        this.imageSRurl = imageUrl;
      } catch (error) {
        console.error(error);
      }
    },
    async detectHuman(file: File) {
      const formData = new FormData();
      formData.append("src_img", file);
      formData.append("json_export", "true");
      formData.append("img_export", "true");

      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/person/human_detect/",
          formData,
          {
            headers: {
              Apikey: this.apikey,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.detectionResult = response.data.human_img;
        console.log(this.detectionResult);
      } catch (error) {
        console.error("Error in human detection:", error);
      }
    },
    async detectHeat(file: File) {
      const formData = new FormData();
      formData.append("src_img", file);
      formData.append("json_export", "true");
      formData.append("img_export", "true");

      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/person/heat_detect/",
          formData,
          {
            headers: {
              Apikey: this.apikey,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this.heatmapResult = response.data.heat_img;
        console.log(this.detectionResult);
      } catch (error) {
        console.error("Error in motion heatmap:", error);
      }
    },
  },
});
