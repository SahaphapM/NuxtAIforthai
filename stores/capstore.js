import { defineStore } from "pinia";
import axios from "axios";

export const useFileStore = defineStore("fileStore", {
  state: () => ({
    apikey: "HpGVQO0LXyLItUHKkm2rjmG2AMgDB5XT",
    file: null,
    caption: null,
    fileUrl: null,
  }),
  actions: {
    handleFileChange(event) {
      this.file = event.target.files[0];
      this.fileUrl = URL.createObjectURL(this.file);
    },
    async submitFileCap() {
      const formData = new FormData();
      formData.append("file", this.file);

      const headers = {
        Apikey: this.apikey,
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/capgen",
          formData,
          { headers }
        );
        if ("caption" in response.data) {
          this.caption = response.data.caption;
        } else {
          console.log("No caption found in response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
    async submitFileSupResolution() {
      const formData = new FormData();
      formData.append("file", this.file);

      const headers = {
        Apikey: this.apikey,
        "Content-Type": "multipart/form-data",
      };

      try {
        const response = await axios.post(
          "https://api.aiforthai.in.th/superresolution/sr",
          formData,
          { headers }
        );
        if (response.data) {
          console.log(response.data.url);
          this.fileUrl = response.data.url;
        } else {
          console.log("No caption found in response.");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
});
