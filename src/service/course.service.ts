import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";

export const courseService = {
  async getCourses() {
    const res = await apiConfig().getRequest(ApiUrls.COURSES);
    return res;
  },
};
