import axiosInstance from ".";
import { Notification } from "../helpers/notification";

export function apiConfig() {
  async function getRequest(url: string, params: object = {}) {
    try {
      const res = await axiosInstance.get(url, { params });
      return res;
    } catch (err: any) {
      Notification("error", err.message);
    }
  }

  async function postRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.post(url, body);
      Notification("success", "Admin logged succes")
      return res;
    } catch (err: any) {
      console.log(err);
      Notification("error", err.message);
    }
  }

  async function putRequest(url: string, body: object = {}) {
    try {
      const res = await axiosInstance.put(url, body);
      Notification("success", "Admin logged succes")
      return res;
    } catch (err: any) {
      console.log(err);
      Notification("error", err.message);
    }
  }

  async function deleteRequest(url: string, params: object= {}) {
    try {
      const res = await axiosInstance.delete(url, {params});
      Notification("success", "Admin logged succes")
      return res;
    } catch (err: any) {
      console.log(err);
      Notification("error", err.message);
    }
  }

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
  };
}
