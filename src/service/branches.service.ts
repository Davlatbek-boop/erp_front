import { ApiUrls } from "@api/api-urls";
import { apiConfig } from "@api/config";
import type { Branch } from "@types";

export const branchService = {
  async getBranches() {
    const res = await apiConfig().getRequest(ApiUrls.BRANCHES);
    return res;
  },

  async getOneBranch(id: number) {
    const res = await apiConfig().getRequest(`${ApiUrls.BRANCHES}/${id}`);
    return res;
  },

  async createBranch(model: Branch) {
    const res = await apiConfig().postRequest(ApiUrls.BRANCHES, model);
    return res;
  },

  async updateBranch(model: Branch, id: number) {
    const res = await apiConfig().patchRequest(`${ApiUrls.BRANCHES}/${id}`, model);
    return res;
  },

  async deleteBranch(id: number) {
    const res = await apiConfig().deleteRequest(`${ApiUrls.BRANCHES}/${id}`);
    return res;
  },

  
};
