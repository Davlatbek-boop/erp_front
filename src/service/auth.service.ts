/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { SignIn } from "@types";
export const authService = {
  async signIn(_model: SignIn, role: string) {
    const res = await apiConfig().postRequest(`/${role}-auth${ApiUrls.AUTH}`, _model);
    return res;
  },


  async signOut(role: string) {
    const res = await apiConfig().getRequest(`/${role}-auth${ApiUrls.OUT}`);
    return res;
  },
};
