import { apiConfig } from "@api/config"
import { ApiUrls } from "@api/api-urls"
import { type Group } from "@types"


export const groupService = {
    async getGroups(){
        const res = await apiConfig().getRequest(ApiUrls.GROUPS)
        return res
    },

    async createGroup(model: Group):Promise<any>{
        const res = await apiConfig().postRequest(ApiUrls.GROUPS, model)
        return res
    },

    async getOneGroup(id:string){
        // console.log(id, "getonegroup");
        const res = await apiConfig().getRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },

    async deleteOneGroup(id:string){
        // console.log(id, "getonegroup");
        const res = await apiConfig().deleteRequest(`${ApiUrls.GROUPS}/${id}`)
        return res
    },
}