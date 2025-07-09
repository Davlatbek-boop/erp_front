import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Course } from "@types";

export const courseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },

  async getOneCourses(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },

  async createCourse(model: Course) {
    const res = await apiConfig().postRequest(ApiUrls.COURSES, model);
    return res;
  },

  async updateCourse(model: Course) {
    console.log("model",model);
    const res = await apiConfig().patchRequest(`${ApiUrls.COURSES}/${model.id}`, model);
    return res;
  },

  async deleteCourse(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.COURSES}/${id}`);
    return res;
  },

  
};
