/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiConfig } from "@api/config";
import { ApiUrls } from "@api/api-urls";
import type { SignIn } from "@types";
export const authService = {
  async signIn(_model: SignIn) {
    const res = await apiConfig().postRequest(ApiUrls.ADMIN_AUTH_LOGIN, _model);
    return res;
  },
};
