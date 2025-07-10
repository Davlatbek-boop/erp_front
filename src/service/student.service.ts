import { ApiUrls } from "../api/api-urls";
import { apiConfig } from "../api/config";
import type { CreateStudent } from "@types";

export const studentService = {
  async getStudents() {
    const res = await apiConfig().getRequest(ApiUrls.STUDENT);
    return res;
  },
  async getOneStudent(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.STUDENT}/${id}`);
    return res;
  },
  async createStudent(model: CreateStudent) {
    const res = await apiConfig().postRequest(ApiUrls.STUDENT, model);
    return res;
  },
  async deleteStudent(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.STUDENT}/${id}`);
    return res;
  },
  async updateStudent(model: CreateStudent, id: number) {
    const res = await apiConfig().patchRequest(
      `${ApiUrls.STUDENT}/${id}`,
      model
    );
    return res;
  },
};
